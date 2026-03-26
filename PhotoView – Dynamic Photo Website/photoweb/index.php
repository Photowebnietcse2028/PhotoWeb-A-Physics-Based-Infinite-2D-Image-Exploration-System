<?php include("includes/session.php"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PhotoView – Dynamic Photo Website</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script>
        // Early theme sync to prevent FOUC (Flash of Unstyled Content)
        const savedTheme = localStorage.getItem("theme") || "dark-mode";
        document.documentElement.className = savedTheme;
    </script>
</head>
<body class="dark-mode">
    <script>
        document.body.className = localStorage.getItem("theme") || "dark-mode";
    </script>

<header>
    <h1>PhotoView</h1>
    <input id="search" placeholder="Type and hit Enter to explore...">

    <div class="auth-links">
        <?php if(isset($_SESSION['user'])): ?>
            <a href="profile.php">Settings</a>
            <a href="logout.php">Logout</a>
        <?php else: ?>
            <a href="login.php">Login</a>
        <?php endif; ?>
    </div>
</header>

<div id="gallery"></div>

<!-- Floating Photo Viewer -->
<div id="floating-view">
    <div id="close-view">&times;</div>
    <div class="img-container">
        <img id="floating-img" src="" alt="Viewing Photo">
    </div>
    <div class="floating-controls">
        <button id="like-btn" class="glass-btn icon-only">
            <span class="icon">👍</span>
        </button>
        <button id="download-btn" class="glass-btn icon-only">
            <span class="icon">📥</span>
        </button>
    </div>
</div>

<div id="toast">Action Successful!</div>

<footer>
    Developed by Avneesh Kumar | Arnav Srivastava | Aryan Chaturvedi
</footer>

<script type="module" src="assets/js/app.js"></script>

</body>
</html>