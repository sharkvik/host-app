import { Component, OnInit } from '@angular/core';
import { PluginLoaderService } from './plugin-loader.service';
import * as _ from 'lodash';

@Component({
	selector: 'nvm-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	public plugins: string[] = [];
	public title = 'nvm';

	private _currentPlugin: HTMLElement;
	constructor(private _pluginLoader: PluginLoaderService) {}

	public ngOnInit(): void {
		this._pluginLoader
			.registredPlugins
			.subscribe( (keys: string[]) => {
				this.plugins = keys;
			});
	}

	public loadPlugin(key: string): void {
		this._pluginLoader.loadPlugin(key)
			.subscribe((content: HTMLElement) => {
				const container = document.getElementById('plugin-placeholder');
				if (!_.isNil(this._currentPlugin)) {
					container.removeChild(this._currentPlugin);
				}
				container.appendChild(content);
				this._currentPlugin = content;
			});
	}
}
