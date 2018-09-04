import { Component, OnInit, ApplicationRef } from '@angular/core';
import { PluginLoaderService } from './plugin-loader.service';
import * as _ from 'lodash';
import { PluginCommunicationService, PluginCommunicationEvent } from 'projects/shared/src/lib/plugin-communication.service';
import { Title } from '@angular/platform-browser';

@Component({
	selector: 'nvm-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public plugins: string[] = [];
	public title = 'nvm-root';

	private _currentPlugin: HTMLElement;
	constructor(
		private _app: ApplicationRef,
		private _pluginLoader: PluginLoaderService,
		private _pluginShareSrevice: PluginCommunicationService,
		private _title: Title
	) {
		this._title.setTitle(this.title);
		this._pluginShareSrevice.registerHostEvent<string>('nvm-root', 'changeTitle')
			.subscribe((data: PluginCommunicationEvent<string>) => {
				if (!_.isEmpty(data.data)) {
					this._title.setTitle(`${data.target}: ${data.data}`);
				} else {
					this._title.setTitle(this.title);
				}
				this._app.tick();
			});
	}

	public ngOnInit(): void {
		this._pluginLoader
			.registredPlugins
			.subscribe( (keys: string[]) => {
				this.plugins = keys;
				this._app.tick();
			});
	}

	public loadPlugin(key: string): void {
		this._pluginLoader
			.loadPlugin(key)
			.subscribe((content: HTMLElement) => this._displayPlugin(content));
	}

	private _displayPlugin(content: HTMLElement) {
		const container = document.getElementById('plugin-placeholder');
		if (!_.isNil(this._currentPlugin)) {
			container.removeChild(this._currentPlugin);
		}
		container.appendChild(content);
		this._currentPlugin = content;
		this._app.tick();
	}
}
