import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { SettingsService } from 'projects/shared/src/lib/settings.service';
import { SharedModule } from 'projects/shared/src/public_api';

export const settongsProvider = (config: SettingsService) => () => {
	return Promise.all([config.load()]);
};

export const useAppConfigProvider = { provide: APP_INITIALIZER, useFactory: settongsProvider, deps: [SettingsService], multi: true };

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		SharedModule.forRoot('/assets/settings.json')
	],
	providers: [
		useAppConfigProvider
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }
