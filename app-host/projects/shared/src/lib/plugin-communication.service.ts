import { Injectable, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class PluginCommunicationService implements OnDestroy {
	private readonly _eventName = 'PluginCommunication.sendDataToPlugin';
	private _plugins: Map<string, Subject<any>> = new Map<string, Subject<any>>();

	constructor() {
		document.addEventListener(this._eventName, this._sendData);
	}

	public ngOnDestroy(): void {
		document.removeEventListener(this._eventName, this._sendData);
	}

	public setData<T>(pluginName: string, eventName: string, data: T): void {
		const key = this._toKey(pluginName, eventName);
		document.dispatchEvent(new CustomEvent( this._eventName, {detail: {plugin: key, data: data}}));
	}

	public register<T>(pluginName: string, eventName: string): Observable<T> {
		const key = this._toKey(pluginName, eventName);
		this._plugins.set(`${pluginName}.${eventName}`, new Subject<T>());
		return this._plugins.get(key) as Subject<T>;
	}

	private _sendData = (data: CustomEvent) => {
		const subject$ = this._plugins.get(data.detail.plugin);
		if (!_.isNil(subject$)) {
			subject$.next(data.detail.data);
		}
	}

	private _toKey(pluginName: string, eventName: string): string {
		return `${pluginName}.${eventName}`;
	}
}
