import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable()
export class SettingsService {
	public static settingsUrl: string;

	private _settings: ReplaySubject<any>;

	constructor(private _http: HttpClient) { }

	public load() {
		if (_.isNil(this._settings)) {
			this._settings = new ReplaySubject<any>(1);
			this._http.get(SettingsService.settingsUrl)
				.subscribe((res) => {
					this._settings.next(res);
				});
		}
	}

	public get modules(): Observable<{name: string, url: string, selector: string}[]> {
		return new Observable<{name: string, url: string, selector: string}[]>((s) => {
			if ( _.isNil(this._settings) ) {
				s.next([]);
				s.complete();
			}
			this._settings
				.subscribe((set) => {
					s.next(set.modules);
					s.complete();
				});
		});
	}
}
