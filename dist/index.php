<?php 

//get id, title and alias of blogs
$db = new mysqli('localhost', 'spuurch_weblab', 'M6PnVe4g7XU9Gj2', 'spuurch_weblab03');
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
<html lang="de">
<head>
<title>Travel Blog</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<script type="text/javascript">
	const siteRoutes = [
		{
			path: '/',
			sitename: 'Home',
			view: 'blogs',
			parentview: false
		},
		{
			path: '/blogs',
			sitename: 'Home',
			view: 'blogs',
			parentview: false
		},
		{
			path: '/login',
			sitename: 'Anmelden',
			view: 'login',
			parentview: 'root'
		},
		<?php foreach ($blogs as $key => $blog): ?>
			{
				path: '/<?php echo $blog['alias'] ;?>',
				sitename: '<?php echo $blog['title'] ;?>',
				id: '<?php echo $blog['id'] ;?>',
				view: 'blog',
				parentview: 'root'
			},
		<?php endforeach; ?>
		{
			path: '/edit',
			sitename: 'Ressource Bearbeiten',
			view: 'edit',
			parentview: 'root'
		},
		{
			path: '/edit/blog',
			sitename: 'Blog Bearbeiten',
			view: 'editBlog',
			parentview: 'edit'
		},
		{
			path: '/edit/post',
			sitename: 'Blog-Post Bearbeiten',
			view: 'editPost',
			parentview: 'edit'
		}
	];
</script>
<script src="js/app.js"></script>
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
		<div id="message"></div>
		<div id= "breadcrumb">
			<ul class="breadcrumb">
				<li class="breadcrumb-item">
					<a route="/">Home</a>
				</li>
			</ul>
		</div>
		<h2 id="site-titel">Site-Titel</h2>
		<div id="app-content"><div style="padding-top: 5%;" class="loading loading-xlg d-block"></div></div>
				
	</main>
	<footer class="docs-footer bg-gray text-center">
		<p>© Copyright 2019 by Manuel Häusler</p>
		<a route="/login">Login</a>
	</footer>

</body>
</html>
