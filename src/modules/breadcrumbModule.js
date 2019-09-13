/*
*
* Class for the Breadcrumbs Module
*
*/
let baseModule = require('./baseModule');

class breadcrumbModule extends baseModule{

	constructor(route, posId) {

		super(route,posId);

		function getRoute(viewName, viewId) {
			let siteArray = [];
			var parent = '';
			//search actual side
			for (let a of siteRoutes) {
				if ((a.view == viewName && a.id == viewId) || (a.view == viewName && viewId == undefined)) {
					if (a.parentview === false) {
						parent = 'root';
						break;
					}
					//add actual site
					siteArray.push(a);
					parent = a.parentview;
					break;
				}
			}			
			//jump from parent to parent until root
			while (parent != 'root') {
				for (let a of siteRoutes) {
					if (a.view == parent) {
						//add parent node
						siteArray.push(a);
						parent = a.parentview;
					}
				}
			}
			//add root
			siteArray.push(siteRoutes[0]);
			//transponde siteArray
			siteArray.reverse();
			return siteArray;
		}
		this.route = getRoute(route.view, route.id);
	}

	// the template of the module
	template() {
		let sites = this.route;
		let li =  html`${sites.map((site) => html`<li class="breadcrumb-item">
													  <a route="${site.path}">${site.sitename}</a>
												  </li>`)}`;
		let tmpl = html`<ul class="breadcrumb">
							${li}
						</ul>`;
		return tmpl;
	}

	renderModule() {
		render(this.template(), this.modulePosition);
	}

}

module.exports = breadcrumbModule;