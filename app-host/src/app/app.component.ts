import { Component, OnInit, ApplicationRef } from '@angular/core';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';
import { PluginLoaderService, PluginCommunicationService, PluginCommunicationEvent } from 'projects/plugin-framework/src/public_api';

@Component({
	selector: 'nvm-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public plugins: {id: string, name: string, url: string, selector: string}[] = [];
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
		this.plugins = this._pluginLoader.registredPlugins;
		Promise.resolve(null).then(() => this._app.tick());
	}

	public loadPlugin(plugin: {id: string, name: string, url: string, selector: string}): void {
		this._pluginLoader
			.loadPlugin(plugin.id)
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
