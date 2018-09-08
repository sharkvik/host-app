import { NgModule, ModuleWithProviders } from '@angular/core';
import { PluginCommunicationService } from './plugin-communication.service';
import { PluginLoaderService } from './plugin-loader.service';
import { SettingsService } from './settings.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	providers: [
		HttpClient
	]
})
export class SharedModule {
	static forRoot(settingsUrl: string): ModuleWithProviders {
		SettingsService.settingsUrl = settingsUrl;
		return {
			ngModule: SharedModule,
			providers: [
				PluginCommunicationService,
				PluginLoaderService,
				SettingsService
			]
		};
	}
}
