/*
*
* Class for the "Blogs" View (Listing of Blogs)
*
*/
let baseView = require('./baseView');

class loginView extends baseView {

	formSubmit(event,methode) {
		event.preventDefault();
		if (methode == 'login') {
			let urlEncodedData = "";
	  		let urlEncodedDataPairs = [];
	  		// get form data
	  		urlEncodedDataPairs.push(encodeURIComponent('username') + '=' + encodeURIComponent(document.getElementById('input-username').value));
	  		urlEncodedDataPairs.push(encodeURIComponent('password') + '=' + encodeURIComponent(document.getElementById('input-password').value));
	  		// create string for api request body
	  		urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
	  		// start login process
	  		auth.doLogin(urlEncodedData);
		} else if (methode == 'logout') {
			// start logout process
			auth.doLogout();
		}
		
	}

	// the template for logged in users which are not usergroup=public
	user_template(authActions) {
		let name = this.data.records.name;
		let tmpl = html`<p>Du bist angemeldet als ${name}.</p>
						<form class="form-horizontal" onsubmit="view.formSubmit(event,'logout')">
							<input id="input-submit" class="btn btn-primary" type="submit"  value="Logout">
						</form>`;
		return tmpl;
	}

	// the template of the view
	template() {
		let tmpl = html`<div class="columns">
						  <div class="column col-9 col-sm-12">
						    <form class="form-horizontal" onsubmit="view.formSubmit(event,'login')">
						      <div class="form-group">
						        <div class="col-3">
						          <label class="form-label" for="input-username">Benutzername</label>
						        </div>
						        <div class="col-9">
						          <input id="input-username" class="form-input" type="text" placeholder="Benutzername" required>
						        </div>
							  </div>
							  <div class="form-group">
						        <div class="col-3">
						          <label class="form-label" for="input-password">Passwort</label>
						        </div>
						        <div class="col-9">
						          <input id="input-password" class="form-input" type="password" placeholder="Passwort" required>
						        </div>
							  </div>
							  <div class="form-group">
								  <div class="col-3"></div>
								  <div class="col-9">
								    <input id="input-submit" class="btn btn-primary" type="submit"  value="Login">
								  </div>
							  </div>
						    </form>
						  </div>
						<div>`;
		return tmpl;
	}

}

module.exports = loginView;