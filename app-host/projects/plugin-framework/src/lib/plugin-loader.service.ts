import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SettingsService } from 'projects/settings/src/public_api';

@Injectable()
export class PluginLoaderService {
	private _pluginsSettings: {id: string, name: string, url: string, selector: string}[] = [];
	private _loadedPlugins: Map<string, string> = new Map<string, string>();
	constructor(private _settings: SettingsService) {
		this._pluginsSettings = this._settings.get<{id: string, name: string, url: string, selector: string}[]>('modules');
	}

	public get registredPlugins(): {id: string, name: string, url: string, selector: string}[] {
		return this._pluginsSettings;
	}

	public loadPlugin(key: string): Observable<HTMLElement> {
		return new Observable<HTMLElement>((s) => {
			this._loadNewPlugin(key);
			const selector = this._loadedPlugins.get(key);
			const element = document.createElement(selector);
			s.next(element);
			s.complete();
		});
	}

	private _loadNewPlugin(key: string): void {
		if ( this._loadedPlugins.has(key) ) {
			return;
		}
		this._fillPluginCache(this._pluginsSettings, key);
	}

	private _fillPluginCache(modules, key) {
		const plugin = modules.find((m) => m.id.toUpperCase() === key.toUpperCase());
		const script = document.createElement('script');
		script.src = plugin.url;
		document.body.appendChild(script);
		this._loadedPlugins.set(key, plugin.selector);
	}
}
