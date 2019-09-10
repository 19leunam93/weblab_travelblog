/*
*
* Main JavaScript-File for the Travel-Blog
* Application.
*
*/

window.onload = function() {

	//-- Initialisation ---------

	// create Router
	const Router = function(name, routes){
		return {
			name: name,
			routes: routes
		}
	};

	const appContent = document.getElementById('app-content');
	const siteTitle = document.getElementById('site-titel');

	const myRouter = new Router('myRouter', siteRoutes)

	modifyContent();

	//---------------------------

	const firstTemplate = (name) => html`<p>Du bist auf der Seite: ${name}</p>`;

	// modify url by internal links
	var activeRoutes = Array.from(document.querySelectorAll('[route]'));
	activeRoutes.forEach(function(route) {
		route.addEventListener('click', internalLinks, false);
	});
	function internalLinks(event) {
		var route = event.target.attributes[0].value;
		window.history.pushState({}, '', route);
		modifyContent();
	};

	// eventlistener for change of the url
	window.onpopstate = function(event) {
		modifyContent();
	};

	// modify HTML-content based on route
	function modifyContent() {
		var currentPath = window.location.pathname;		
		var routeInfo = myRouter.routes.filter(function(r) {
			return r.path === currentPath;
		})[0];
		console.log(routeInfo);
		if (!routeInfo) {
			siteTitle.innerHTML = '404';
			appContent.innerHTML = 'Seite existiert nicht!';
		} else {
			siteTitle.innerHTML = routeInfo.sitename;
			// add app functionality here
			//render(<p>Du bist auf der Seite: ${sitename}</p>, document.getElementById('app-content'));
			render(firstTemplate(routeInfo.sitename), appContent.innerHTML);
		}
	}
};