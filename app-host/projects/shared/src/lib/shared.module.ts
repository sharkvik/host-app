import { NgModule, ModuleWithProviders } from '@angular/core';
import { PluginCommunicationService } from './plugin-communication.service';

@NgModule()
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule,
			providers: [
				PluginCommunicationService
			]
		};
	}
}
