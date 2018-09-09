import { Component } from '@angular/core';
import { PluginCommunicationService } from 'projects/plugin-framework/src/public_api';

@Component({
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private _sharedService: PluginCommunicationService) {
		this._sharedService.trigger('pluginLoaded', 'placeholder-plugin', null);
	}
}
