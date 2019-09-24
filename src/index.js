/*
*
* Main JavaScript-File for the Travel-Blog
* Application.
*
*/

import {html, render} from 'lit-html';
window.html = html;
window.render = render;

const dynView = require('./views/dynView');
const breadcrumbModule = require('./modules/breadcrumbModule');
const Authentication = require('./helper/authentication');

window.onload = function() {

	//-- Initialisation ---------

	// Message-Box //
	////////////////
	// clear message box
	const clearMessages = function() {
		let $tmpl = html``;
		render($tmpl, document.getElementById('message'));
	}
	window.clearMessages = clearMessages;

	// set a message to the message box
	const setMessage = function(type, message) {
		let msgBox = html`<div class="toast toast-${type}">
  						<button class="btn btn-clear float-right" onclick="clearMessages()"></button>
  						${message}
					</div>`;
		return msgBox;
	}
	window.setMessage = setMessage;

	// Router //
	////////////

	// eventlistener on internal links to modify the url
	const indexLinks = function() {
		let activeRoutes = Array.from(document.querySelectorAll('[route]'));
		activeRoutes.forEach(function(links) {
			links.removeEventListener('click', internalLinks, false);
			links.addEventListener('click', internalLinks, false);
		});
	}
	window.indexLinks = indexLinks;

	// create Router
	const Router = function(name, routes){
		return {
			name: name,
			routes: routes
		}
	};
	const myRouter = new Router('myRouter', siteRoutes)

	// Global relevant HTML-Elements //
	///////////////////////////////////

	const appContent = document.getElementById('app-content');
	const siteTitle = document.getElementById('site-titel');

	// Authorisation //
	//////////////////
	const auth = new Authentication();
	window.auth = auth;


	//---------------------------

	const internalLinks = function(event) {
		var route = event.target.getAttribute('route');
		window.history.pushState({}, '', route);
		modifyContent();
	};

	// eventlistener for change of the url
	window.onpopstate = function(event) {
		modifyContent();
	};

	// modify HTML-content based on route
	const modifyContent = function() {
		clearMessages();
		let currentPath = window.location.pathname;		
		let routeInfo = myRouter.routes.filter(function(r) {
			return r.path === currentPath;
		})[0];
		console.log('routeInfo:');
		console.log(routeInfo);
		if (!routeInfo) {
			siteTitle.innerHTML = '404';
			var tmpl = () => html`Seite existiert nicht!`;
			render(tmpl(), appContent);
			//appContent.innerHTML = 'Seite existiert nicht!';
		} else {
			// insert sitetitel into <h2 id="site-titel">
			siteTitle.innerHTML = routeInfo.sitename;
			
			// construct view-class based on route
			let viewName = routeInfo.view + 'View';
			let view = dynView(viewName, routeInfo);
			window.view = view;
			// authentification of this view (Are you authorized to see this view?)
			//auth.doAuthorisation(viewName);

			// insert content into <div id="app-content">
			view.renderView(appContent);

			setTimeout(function(){console.log('viewObj:');console.log(view);},2000);

			// insert breadcrumbs into <ul class="breadcrumb">
			let breadcrumbs = new breadcrumbModule(routeInfo, 'breadcrumb');
			breadcrumbs.renderModule();
		}
	}
	window.modifyContent = modifyContent;

	// load initial site
	modifyContent();
};