import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import { AppComponent } from './app.component';
import { SettingsModule, SettingsService } from 'projects/settings/src/public_api';
import { PluginFrameworkModule } from 'projects/plugin-framework/src/public_api';

export const settingsProvider = (config: SettingsService) => () => {
	return Promise.all([config.load('/assets/settings.json')]);
};

export const useAppConfigProvider = { provide: APP_INITIALIZER, useFactory: settingsProvider, deps: [SettingsService], multi: true };

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		SettingsModule.forRoot(),
		PluginFrameworkModule.forRoot()
	],
	providers: [
		useAppConfigProvider
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	bootstrap: [AppComponent]
})
export class AppModule { }
