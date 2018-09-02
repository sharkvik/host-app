import { Injectable } from '@angular/core';
import { SettingsService } from '../settings/settings.service';
import { Observable } from 'rxjs';

@Injectable()
export class PluginLoaderService {
	private _loadedPlugins: Map<string, HTMLElement> = new Map<string, HTMLElement>();
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
				s.next(this._loadedPlugins.get(key));
				s.complete();
				return;
			}

			this._settings.modules
				.subscribe((modules) => {
					const plugin = modules.find((m) => m.name.toUpperCase() === key.toUpperCase());
					const script = document.createElement('script');
					script.src = plugin.url;
					document.body.appendChild(script);
					const element = document.createElement(plugin.selector);
					this._loadedPlugins.set(key, element);
					s.next(element);
					s.complete();
				});
		});
	}
}
