/*
*
* Class for the Authentication Helper
* 
*/

class Authentication {

	constructor() {
		this.username = '';
		this.usergroup = 'public';
		this.token_expiretime = 0;
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
					if (data1.secure_token != undefined) {
						localStorage.setItem('secure_token', data1.secure_token);
						localStorage.setItem('secure_username', data1.secure_username);
						//this.token_generated = true;
					}
					this.doLogin(requestBody);
				})
				//.catch((error) => {render(setMessage('error', error), document.getElementById('message'));})
	}

	doLogin(formBody) {
		let url = 'https://api.weblab.spuur.ch/login';
		let parameters = {method: 'GET', mode: 'cors',
						  headers: {'Authorization': 'Bearer ' + localStorage.getItem('secure_token')}};
		if (localStorage.getItem("secure_token") !== null) {
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
						this.username = data.authorization.logged_in_as_user;
						this.usergroup = data.authorization.logged_in_as_usergroup;
						let msg = 'Login erfolgreich...';
						render(setMessage('success', msg), document.getElementById('message'));
						setTimeout(function(){modifyContent();},1000);
					})
					//.catch((error) => {render(setMessage('error', error), document.getElementById('message'));})
		} else {
			this.getToken(formBody);
		}

	} 
 
	doLogout() {
		this.username = '';
		this.usergroup = 'public';
		//this.token_generated == false;
		localStorage.removeItem('secure_token');
		localStorage.removeItem('secure_username');
		let msg = 'Logout erfolgreich...';
		render(setMessage('success', msg), document.getElementById('message'));
		setTimeout(function(){modifyContent();},1000);
	}

	doAuthorisation(authorization_data) {
		// update username and usergroup information
		if (authorization_data.logged_in_as_user != 'no_login') {
			this.username = authorization_data.logged_in_as_user;
			this.usergroup = authorization_data.logged_in_as_usergroup;
		} else {
			this.username = '';
			this.usergroup = 'public';
		}
		if (authorization_data.token_is_valid_for === 'no_token') {
			this.token_expiretime = 0;
		} else {
			this.token_expiretime = authorization_data.token_is_valid_for;
		}		
		return [authorization_data.authorized_current_action, authorization_data.authorized_actions];		
	}
}

module.exports = Authentication;