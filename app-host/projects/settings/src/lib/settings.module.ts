import { NgModule, ModuleWithProviders } from '@angular/core';
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
export class SettingsModule {
	static forRoot(settingsUrl: string): ModuleWithProviders {
		SettingsService.settingsUrl = settingsUrl;
		return {
			ngModule: SettingsModule,
			providers: [
				SettingsService
			]
		};
	}
}
