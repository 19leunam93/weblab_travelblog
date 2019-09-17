/*
*
* Class for the Authentication Helper
* 
*/

class Authentication {

	constructor() {
		this.logged_in = false;
		this.username = '';
		this.usergroup = 'public';
		this.token_generated = false;
	}

	getToken(requestBody) {
		let url = 'https://api.weblab.spuur.ch/token';
		let parameters = {method: 'POST', mode: 'cors',
						  headers: {'Authorization': 'Bearer ' + localStorage.getItem('secure_token'),
						  			'Content-Type': 'application/x-www-form-urlencoded'},
						  body: requestBody};
		async function getJXT() {
			let response = await fetch (url, parameters);
			if (await response.status == 200) {
				return response.json();
			} else {
				let error = response.status + ': Falsches Passwort oder Benutzername';
				render(setMessage('error', error), document.getElementById('message'));
			}
		}
		getJXT().then((data) => {
					let data1 = data;
					// set token_generated
					if (data1.secure_token != undefined) {
						localStorage.setItem('secure_token', data1.secure_token);
						localStorage.setItem('secure_username', data1.secure_username);
						this.token_generated = true;
					}
					this.doLogin(requestBody);
				})
				//.catch((error) => {render(setMessage('error', error), document.getElementById('message'));})
	}

	doLogin(formBody) {
		let url = 'https://api.weblab.spuur.ch/login';
		let parameters = {method: 'GET', mode: 'cors',
						  headers: {'Authorization': 'Bearer ' + localStorage.getItem('secure_token')}};
		if (this.token_generated == true) {
			async function doValidation() {
				let response = await fetch (url, parameters);
				if (await response.status == 200) {
					return response.json();
				} else {
					let error = 'Netzwerkfehler: ' + response.status + ' - ' + response.statusText;
					render(setMessage('error', error), document.getElementById('message'));
				}
			}
			doValidation().then((data) => {
						this.logged_in = true;
						this.username = data.authorization.logged_in_as_user;
						this.usergroup = data.authorization.logged_in_as_usergroup;
						let msg = 'Login erfolgreich...';
						render(setMessage('success', msg), document.getElementById('message'));
						setTimeout(function(){window.history.pushState({}, '', '/login');modifyContent();},1000);
					})
					//.catch((error) => {render(setMessage('error', error), document.getElementById('message'));})
		} else {
			this.getToken(formBody);
		}

	}
 
	doLogout() {
		this.logged_in = false;
		this.username = '';
		this.usergroup = 'public';
		this.token_generated == false;
		localStorage.removeItem('secure_token');
		localStorage.removeItem('secure_username');
		let msg = 'Logout erfolgreich...';
		render(setMessage('success', msg), document.getElementById('message'));
		setTimeout(function(){window.history.pushState({}, '', '/login');modifyContent();},1000);
	}

	doAuthorisation(authorization_data) {
		// update username and usergroup information
		if (authorization_data.logged_in_as_user != 'no_login') {
			this.username = authorization_data.logged_in_as_user;
			this.usergroup = authorization_data.logged_in_as_usergroup;
		} else {
			this.logged_in = false;
			this.username = '';
			this.usergroup = 'public';
		}
		return [authorization_data.authorized_current_action, authorization_data.authorized_actions];		
	}
}

module.exports = Authentication;