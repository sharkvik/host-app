import { NgModule, ModuleWithProviders } from '@angular/core';
import { PluginCommunicationService } from './plugin-communication.service';
import { PluginLoaderService } from './plugin-loader.service';

@NgModule()
export class PluginFrameworkModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: PluginFrameworkModule,
			providers: [
				PluginCommunicationService,
				PluginLoaderService
			]
		};
	}
}
