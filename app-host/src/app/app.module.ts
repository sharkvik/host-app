import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { SettingsModule } from '../settings/settings.module';
import { SettingsService } from '../settings/settings.service';
import { PluginLoaderService } from './plugin-loader.service';
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
		SettingsModule.forRoot('/assets/settings.json'),
		SharedModule.forRoot()
	],
	providers: [
		useAppConfigProvider,
		PluginLoaderService
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }
