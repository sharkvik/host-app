export class PluginSettings {
	constructor(
		public id: string,
		public placeHolder: string,
		public name: string,
		public src: string,
		public selector: string,
		public content: HTMLElement
	) {	}
}
