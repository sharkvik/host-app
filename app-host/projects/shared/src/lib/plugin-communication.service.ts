import { Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PluginCommunicationService implements OnDestroy {
	private readonly _eventName = 'PluginCommunicationService.dataTransfer';
	private _hostEvents: Map<string, Map<string, Subject<PluginCommunicationEvent<any>>>> = new Map<string, Map<string, Subject<PluginCommunicationEvent<any>>>>();

	constructor() {
		document.addEventListener(this._eventName, this._notify);
	}

	public ngOnDestroy(): void {
		document.removeEventListener(this._eventName, this._notify);
	}

	public registerHostEvent<T>(hostId: string, eventName: string): Subject<PluginCommunicationEvent<T>> {
		if (this._hostEvents.has(eventName)) {
			const hosts = this._hostEvents.get(eventName);
			if (hosts.has(hostId)) {
				throw Error(`PluginCommunicationService.registerHostEvent<> host ${hostId} event ${eventName} was registred`);
			}
			hosts.set(hostId, new Subject<PluginCommunicationEvent<T>>());
			return hosts.get(hostId);
		}
		this._hostEvents.set(eventName, new Map<string, Subject<PluginCommunicationEvent<T>>>());
		const newHosts = this._hostEvents.get(eventName);
		newHosts.set(hostId, new Subject<PluginCommunicationEvent<T>>());
		return newHosts.get(hostId);
	}

	public trigger<T>(eventName: string, pluginId: string, data: T): void {
		document.dispatchEvent(new CustomEvent( this._eventName, {detail: new PluginCommunicationEvent<T>(pluginId, eventName, data)}));
	}

	private _notify = (data: CustomEvent) => {
		const subjects = this._hostEvents.get(data.detail.eventName);
		if (!_.isEmpty(subjects)) {
			subjects.forEach((subject$: Subject<any>) => subject$.next(data.detail));
		}
	}
}

export class PluginCommunicationEvent<T> {
	constructor(public target: string, public eventName: string, public data: T) {}
}
