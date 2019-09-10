<?php

//get id, title and alias of blogs
$db = new mysqli('localhost', 'spuurch_weblab', 'password', 'spuurch_weblab03');
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
$query = "SELECT id, title, alias FROM blogs ORDER BY date DESC";
$result = $db->query($query);
$blogs = array();
if ($result->num_rows > 0) {
	while($row = $result->fetch_assoc()){
		$blogs[] = $row;
	}
}
?>
<!DOCTYPE html>
<html lang="de-DE">
<head>
<title>Travel Blog</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="module">
	import {html, render} from 'https://unpkg.com/lit-html?module';
</script>
<script type="text/javascript">
	const siteRoutes = [
		{
			path: '/',
			sitename: 'Home',
			view: 'blogs'
		},
		{
			path: '/blogs',
			sitename: 'Home',
			view: 'blogs'
		},
		{
			path: '/login',
			sitename: 'Anmelden',
			view: 'login'
		},
		<?php foreach ($blogs as $key => $blog): ?>
			{
				path: '/<?php echo $blog['alias'] ;?>',
				sitename: '<?php echo $blog['title'] ;?>',
				id: '<?php echo $blog['id'] ;?>',
				view: 'blog'
			},
		<?php endforeach; ?>
		{
			path: '/edit',
			sitename: 'Ressource Bearbeiten',
			view: 'edit'
		},
		{
			path: '/edit/blog',
			sitename: 'Blog Bearbeiten',
			view: 'editBlog'
		},
		{
			path: '/edit/post',
			sitename: 'Blog-Post Bearbeiten',
			view: 'editPost'
		}
	];
</script>
<script src="app/app.js"></script>
<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<header class="hero hero-sm bg-gray text-primary">
		<div class="hero-body text-center">
			<h1>Travel Blog</h1>
			<p>Single-Page Anwendung fürs Modul WebLab</p>
		</div>
	</header>
	<main class="docs-content container">
		<ul class="breadcrumb">
			<li class="breadcrumb-item">
				<a route="/">Home</a>
			</li>
		</ul>
		<button route="/">Home</button>
		<button route="/blogs">Blog-List</button>
		<button route="/safari-in-namibia">Blog1</button>
		<h2 id="site-titel">Site-Titel</h2>
		<div id="app-content"><div style="padding-top: 5%;" class="loading loading-xlg d-block"></div></div>
				
	</main>
	<footer class="docs-footer bg-gray text-center">
		<p>© Copyright 2019 by Manuel Häusler</p>
		<a route="/login">Login</a>
	</footer>

</body>
</html>
