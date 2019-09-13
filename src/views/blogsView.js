/*
*
* Class for the "Blogs" View (Listing of Blogs)
*
*/
let baseView = require('./baseView');

class blogsView extends baseView {

	// the template of the view
	template() {
		let blogs = this.ressource.records;
		let bloglist =  html`${blogs.map((blog) => html`<div class="column col-12">
											  	<div class="card flex-row">
											  	  <div class="card-image">
											  	  	<img class="img-responsive" src="${blog.img_intro}">
											  	  </div>
											  	  <div class="card-content">
											  	  	<div class="card-header">
											  	  	  <a class="card-title h4" route="${blog.alias}">${blog.title}</a>
											  	  	  <div class="card-subtitle text-gray">Datum: ${blog.date} / Destination: ${blog.destination}</div>
											  	  	</div>
											  	  	<div class="card-body">${blog.description}</div>
											  	  	<div class="card-footer"><button class="btn btn-primary" route="${blog.alias}">Weiterlesen...</button></div>
											  	  </div>
											  	</div>
											  </div>`)}`;
		let tmpl = html`<div class="columns">${bloglist}<div>`;
		return tmpl;
	}

}

module.exports = blogsView;