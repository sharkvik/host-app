import { Component, OnDestroy } from '@angular/core';
import { PluginCommunicationService } from 'projects/plugin-framework/src/public_api';

@Component({
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
	public title = 'Установщик тайтла';
	constructor(private _sharedService: PluginCommunicationService) {
		this._sharedService.trigger('changeTitle', 'data-plugin', this.title);
		this._sharedService.trigger('pluginLoaded', 'data-plugin', null);
	}

	public ngOnDestroy(): void {
		this._sharedService.trigger('changeTitle', 'data-plugin', null);
	}
}
