import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from './settings.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
