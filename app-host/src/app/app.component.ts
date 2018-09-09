import { Component, OnInit, ApplicationRef } from '@angular/core';
import * as _ from 'lodash';
import { Title } from '@angular/platform-browser';
import { PluginLoaderService, PluginCommunicationService, PluginCommunicationEvent, PluginSettings } from 'projects/plugin-framework/src/public_api';

@Component({
	selector: 'nvm-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public plugins: PluginSettings[] = [];
	public title = 'nvm-root';
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
		this._pluginShareSrevice.registerHostEvent<string>('nvm-root', 'pluginLoaded')
			.subscribe((data: PluginCommunicationEvent<string>) => {
				this._app.tick();
			});
	}

	public ngOnInit(): void {
		this.plugins = this._pluginLoader.registredPlugins;
		Promise.resolve(null).then(() => this._app.tick());
	}

	public loadPlugin(plugin: PluginSettings): void {
		this._pluginLoader.loadPlugin(plugin.id);
	}
}
