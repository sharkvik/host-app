import { Component, OnDestroy } from '@angular/core';
import { PluginCommunicationService } from '../../../shared/src/lib/plugin-communication.service';

@Component({
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
	title = 'nvm';
	constructor(private _sharedService: PluginCommunicationService) {
		this._sharedService.setData('host', 'documentTitle', 'data-plugin');
	}

	public ngOnDestroy(): void {
		this._sharedService.setData('host', 'documentTitle', 'nvm');
	}
}
