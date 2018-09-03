import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { SharedModule } from 'projects/shared/src/public_api';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		SharedModule.forRoot()
	],
	entryComponents: [AppComponent]
})
export class AppModule {
	constructor(private injector: Injector) {
	}

	ngDoBootstrap() {
		const externalTileCE = createCustomElement(AppComponent, { injector: this.injector });
		customElements.define('placeholder-plugin', externalTileCE);
	}
}
