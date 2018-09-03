import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule
	],
	entryComponents: [AppComponent]
})
export class AppModule {
	constructor(private injector: Injector) {
	}

	ngDoBootstrap() {
		const externalTileCE = createCustomElement(AppComponent, { injector: this.injector });
		customElements.define('data-plugin', externalTileCE);
	}
}
