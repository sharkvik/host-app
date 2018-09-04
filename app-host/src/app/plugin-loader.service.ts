import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { Observable } from 'rxjs';

@Injectable()
export class PluginLoaderService {
	private _loadedPlugins: Map<string, string> = new Map<string, string>();
	constructor(private _settings: SettingsService) { }

	public get registredPlugins(): Observable<string[]> {
		return new Observable<string[]>((s) => {
			this._settings
				.modules
				.subscribe((modules) => {
					const keys = modules.map((m) => m.name);
					s.next(keys);
				});
		});
	}

	public loadPlugin(key: string): Observable<HTMLElement> {
		return new Observable<HTMLElement>((s) => {
			if (this._loadedPlugins.has(key)) {
				const selector = this._loadedPlugins.get(key);
				const element = document.createElement(selector);
				s.next(element);
				s.complete();
				return;
			}

			this._settings.modules
				.subscribe((modules) => {
					const plugin = modules.find((m) => m.name.toUpperCase() === key.toUpperCase());
					const script = document.createElement('script');
					script.src = plugin.url;
					document.body.appendChild(script);
					this._loadedPlugins.set(key, plugin.selector);

					const element = document.createElement(plugin.selector);
					s.next(element);
					s.complete();
				});
		});
	}
}
