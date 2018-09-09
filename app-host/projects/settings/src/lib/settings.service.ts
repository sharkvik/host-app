import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { ReplaySubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class SettingsService {
	private _settings: ReplaySubject<any>;
	private _syncSettings: any;

	constructor(private _http: HttpClient) {
	}

	public load(settingsUrl: string): Promise<void> {
		if (_.isNil(this._settings)) {
			this._settings = new ReplaySubject<any>(1);
			return new Promise<void>((resolve, ref) => this._http.get(settingsUrl)
				.subscribe((res) => {
					this._settings.next(res);
					this._syncSettings = res;
					resolve();
				}));
		}
		return this._settings.toPromise();
	}

	public getAsync<T>(key: string): Observable<T> {
		return new Observable<T>((s) => {
			if ( _.isNil(this._settings) ) {
				s.next(null);
				s.complete();
			}
			this._settings
				.subscribe((set) => {
					s.next(set[key]);
					s.complete();
				});
		});
	}

	public get<T>(key: string): T {
		if (_.isNil(this._syncSettings)) {
			return null;
		}
		return this._syncSettings[key] as T;
	}
}
