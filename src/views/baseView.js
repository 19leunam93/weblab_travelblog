/*
*
* Base-Class for the View-Classes
*
*/

class baseView {

	constructor(route) {
		function createapi(route) {
			if (typeof route.view !== 'undefined') {
				var view = '/' + route.view;
			} else {var view = ''}
			if (typeof route.id !== 'undefined') {
				var id = '/' + route.id;
			} else {var id = ''}
			return view + id;
		}
		this.base_apiURL = 'https://api.weblab.spuur.ch' + createapi(route);
		this.sitename = route.sitename;
		this.viewAuth = false;
	}

	// the template of the view
	template() {
		let name = this.sitename;
		return html`<p>Du bist auf der Seite: ${name}</p>`;
	}

	// get data from api and render the template into a given element
	renderView(element) {
		let url = this.base_apiURL;
		async function getRecords() {
			let response = await fetch (url);
			if (await response.status == 200) {
				return response.json();
			} else {
				let error = 'Netzwerkfehler: ' + response.status + ' - ' + response.statusText;
				render(setMessage('error', error), document.getElementById('message'));
			}
		}
		getRecords().then((data) => {this.ressource = data;})
					.then(() => {render(this.template(), element); indexLinks();})
					//.catch((error) => {render(setMessage('error', error), document.getElementById('message'));})
	}


}

module.exports = baseView;