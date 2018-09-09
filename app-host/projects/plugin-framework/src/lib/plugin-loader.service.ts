import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from 'projects/settings/src/public_api';
import { PluginSettings } from './plugin-settings';
import * as _ from 'lodash';

@Injectable()
export class PluginLoaderService {
	private _pluginsSettings: PluginSettings[] = [];
	private _loadedPlugins: Map<string, PluginSettings> = new Map<string, PluginSettings>();
	private _displayedPlugins: Map<string, PluginSettings> = new Map<string, PluginSettings>();

	constructor(private _settings: SettingsService) {
		this._pluginsSettings = this._settings.get<PluginSettings[]>('modules');
	}

	public get registredPlugins(): PluginSettings[] {
		return this._pluginsSettings;
	}

	public loadPlugin(id: string): void {
		this._loadPlugin(id)
			.subscribe((plugin: PluginSettings) => this._displayPlugin(plugin));
	}

	private _displayPlugin(plugin: PluginSettings): void {
		if (!this._displayedPlugins.has(plugin.placeHolder)) {
			this._fillPlaceHolder(plugin, null);
			return;
		}
		const displayedPlugin = this._displayedPlugins.get(plugin.placeHolder);
		if (!_.isNil(displayedPlugin) && displayedPlugin.selector.toUpperCase() === plugin.selector.toUpperCase()) {
			return;
		}
		this._fillPlaceHolder(plugin, displayedPlugin);
	}

	private _fillPlaceHolder(plugin: PluginSettings, oldPlugin: PluginSettings): void {
		const container = document.getElementById(plugin.placeHolder);
		if (!_.isNil(oldPlugin)) {
			container.removeChild(oldPlugin.content);
		}
		plugin.content = document.createElement(plugin.selector);
		container.appendChild(plugin.content);
		this._displayedPlugins.set(plugin.placeHolder, plugin);
	}

	private _loadPlugin(key: string): Observable<PluginSettings> {
		return new Observable<PluginSettings>((s) => {
			this._loadNewPlugin(key);
			s.next(this._loadedPlugins.get(key));
			s.complete();
		});
	}

	private _loadNewPlugin(key: string): void {
		if ( this._loadedPlugins.has(key) ) {
			return;
		}
		this._fillPluginCache(this._pluginsSettings, key);
	}

	private _fillPluginCache(modules, key): void {
		const plugin = modules.find((m) => m.id.toUpperCase() === key.toUpperCase());
		this._addScript(plugin);
		this._loadedPlugins.set(key, plugin);
	}

	private _addScript(plugin: PluginSettings): void {
		const script = document.createElement('script');
		script.src = plugin.src;
		document.body.appendChild(script);
	}
}
