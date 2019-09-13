/*
*
* Class for the "Blog" View (single Blog)
*
*/
let baseView = require('./baseView');

class blogView extends baseView {

	// the template of the view
	template() {
		let blog = this.ressource.records;
		let posts = blog.posts.records;
		let postlist = [];
		let gallery = html``;
		for (let post of posts) {
			if (post.gallery != undefined) {
				let images = post.gallery.images;
				let figlist = [];
				let loclist = [];
				let navlist = [];
				let lenght = images.length;
				let index = 1;
				let prev = lenght;
				let next = index + 1;
				for (let img of images) {
					if (index == 1) {prev = lenght; next = index + 1;}
					else if (index == lenght) {prev = index - 1; next = 1;}
					else {prev = index - 1; next = index + 1;}
					img = img.replace(/"/g,'');

				//Carousel Template
				//-----------------
					figlist.push(html`<figure class="carousel-item">
										      <label class="item-prev btn btn-action btn-lg" for="slide-${prev}"><i class="icon icon-arrow-left"></i></label>
										      <label class="item-next btn btn-action btn-lg" for="slide-${next}"><i class="icon icon-arrow-right"></i></label>
										      <img class="img-responsive rounded" src="${img}">
										  </figure>`);
					if (index == 1) {
						loclist.push(html`<input class="carousel-locator" id="slide-${index}" type="radio" name="carousel-radio" hidden="" checked="">`);
					} else {
						loclist.push(html`<input class="carousel-locator" id="slide-${index}" type="radio" name="carousel-radio" hidden="">`);
					}
					
					navlist.push(html`<label class="nav-item text-hide c-hand" for="slide-${index}">${index}</label>`);
					index++;
				}
				gallery = html`<div class="carousel p-centered">
									  ${loclist}
									  <div class="carousel-container">
									  	${figlist}
									  </div>
									  <div class="carousel-nav">
									  	${navlist}
									  </div>
								   </div>`;
				//------------------
			} else {gallery = html``;}

			//Einzelner Post
			postlist.push(html`<div class="column col-12 blogpost">
									 <div class="card flex-column">
									 <div class="card-body">
								       <h4>${post.title}</h4>
								       <div class="infos text-gray">Datum: ${post.date} / Author: ${post.user_id} / Anzahl Likes: ${post.likes}</div>
								       <p class="text-intro">${post.txt_intro}</p>
									   <figure class="figure mb-6">
									     <img class="img-responsive p-centered" src="${post.img}">
									   </figure>
									   <p>${post.txt_content}</p>
									   ${gallery}
									   <div class="text-center mt-10">
									   	 <button class="btn" onclick="view.doLike(${post.id})"><span class="icon icon-emoji mr-2"></span>Gefällt mir</button><span class="ml-2">(<span id="postLike-${post.id}">${post.likes}</span>)</span>
									   </div>
									 </div>
									 </div>
						  		  </div>`);
		}
		//Blog Einleitung (Titelbild, Beschreibung, Details)
		let tmpl = html`<div class="blog-intro">
							<figure class="figure">
			 				  <img class="img-responsive" src="${blog.img_titel}">
			 				  <figcaption class="figure-caption">Datum: ${blog.date} / Destination: ${blog.destination} / Dauer: ${blog.duration} Tage</figcaption>
			 				</figure>
			 				<p class="text-intro">${blog.description}</p><br /><div class="columns">${postlist}</div>
		 				</div>`;
		return tmpl;
	}

	// deliver a like
	doLike(postId) {
		let url = 'https://api.weblab.spuur.ch/post' + '/' + postId + '/likes';
		async function Like() {
			let response = await fetch (url, {method: 'PUT',headers: {'Content-Type': 'application/x-www-form-urlencoded'},body:'likes=1'});
			if (await response.status == 200) {
				let success = 'Danke! Dein Like wurde aufgenommen';
				render(setMessage('success', success), document.getElementById('message'));
				return response.json();
			} else {
				let error = 'Netzwerkfehler: ' + response.status + ' - ' + response.statusText;
				render(setMessage('error', error), document.getElementById('message'));
			}
		}
		Like().then((data) => {document.getElementById('postLike-'+postId).innerHTML = data.records.likes;});
	}
}

module.exports = blogView;