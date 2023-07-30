export class CssBuilder {
	css: string;

	constructor() {
		this.css = '';
	}

	addClass(c: string, conditional: boolean = true): CssBuilder {
		if (conditional) {
			this.css += c + ' ';
		}
		return this;
	}

	build(): string {
		return this.css;
	}
}
