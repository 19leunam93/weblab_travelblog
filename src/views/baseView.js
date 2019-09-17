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
		this.authorized = false;
		this.authorized_actions = [];
	}

	// the template for unauthorized users
	template401() {
		let name = this.sitename;
		let msg = '401: Nicht authorisiert!';
		render(setMessage('error', error), document.getElementById('message'));
		return html`<p>Du bist nicht authorisiert, die Seite ${name} zu betrachten.</p>`;
	}

	// the standard template
	template() {
		let name = this.sitename;
		return html`<p>Du befindest dich auf der Seite: ${name}.</p>`;
	}

	// the template for logged in users
	user_template(authActions) {
		let username = this.username;
		return html`<p>Hallo ${username}. Du befindest dich auf der Seite: ${name}.</p>`;
	}

	// get data from api and render the template into a given element
	renderView(element) {
		let url = this.base_apiURL;
		let parameters = {method: 'GET', mode: 'cors'};
		if (localStorage.getItem("secure_token") === null) {
			parameters = {method: 'GET', mode: 'cors'};
		} else {
			parameters = {method: 'GET', mode: 'cors',headers: {'Authorization': 'Bearer ' + localStorage.getItem('secure_token')}};
		}
		async function getRecords() {
			let response = await fetch (url, parameters);
			if (await response.status == 200) {
				return response.json();
			} else {
				let error = 'Netzwerkfehler: ' + response.status + ' - ' + response.statusText;
				render(setMessage('error', error), document.getElementById('message'));
			}
		}
		getRecords().then((data) => {this.data = data;})
					.then(() => {
						// authentification of this view (Are you authorized to see this view?)
						[this.authorized, this.authorized_actions] = auth.doAuthorisation(this.data.authorization);
						console.log('authObj:');
						console.log(auth);
						// depending of the authorization select the template
						console.log('template:');
						if (this.authorized) {
							if (auth.logged_in) {
								render(this.user_template(this.authorized_actions), element);
								console.log('user_template()');
							} else {
								render(this.template(), element);
								console.log('template()');
							}							
						} else {
							render(this.template401(), element);
							console.log('template401()');
						}
									
						indexLinks();
					})
					//.catch((error) => {render(setMessage('error', error), document.getElementById('message'));})
	}
}

module.exports = baseView;