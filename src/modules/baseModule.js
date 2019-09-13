/*
*
* Class for the Breadcrumbs Module
*
*/

class baseModule {

	constructor(route, posId) {

		this.modulePosition = document.getElementById(posId);
		this.sitename = route.sitename;
		this.path = route.path;
	}

	// the template of the module
	template() {
		return html`<p>Das ist eine Modulposition</p>`;
	}

	renderModule() {
		render(this.template(), this.modulePosition);
	}

}

module.exports = baseModule;