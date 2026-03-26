<?php
include("includes/session.php");

if (!isset($_SESSION['user'])) {
    header("Location: login.php");
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Settings - PhotoView</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <script>
        // Apply theme immediately to prevent flash
        const savedTheme = localStorage.getItem("theme") || "dark-mode";
        document.documentElement.className = savedTheme;
    </script>
</head>
<body class="auth-body">
    <script>
        // Also apply to body
        document.body.className = "auth-body " + (localStorage.getItem("theme") || "dark-mode");
    </script>

    <header>
        <h1>PhotoView Settings</h1>
        <div class="auth-links">
            <a href="index.php">Back to Gallery</a>
            <a href="logout.php">Logout</a>
        </div>
    </header>

    <div class="settings-card">
        <h2>Hello, <?php echo htmlspecialchars($_SESSION['user']); ?></h2>
        
        <div style="margin: 30px 0; text-align: left;">
            <p style="display: flex; justify-content: space-between; align-items: center;">
                Theme Mode 
                <button class="btn-action" id="theme-toggle" style="width: 120px; padding: 10px; margin: 0;">Switch Theme</button>
            </p>
            <p style="display: flex; justify-content: space-between; align-items: center;">
                Browser Cache 
                <button class="btn-action" onclick="location.reload(true)" style="width: 120px; padding: 10px; margin: 0;">Clear Now</button>
            </p>
        </div>

        <button class="btn-action" onclick="location.href='logout.php'" style="background: var(--text-color); color: var(--bg-color);">Logout Session</button>
    </div>

    <script>
        const themeToggle = document.getElementById("theme-toggle");
        
        themeToggle.onclick = () => {
            const isDark = document.body.classList.contains("dark-mode");
            const newTheme = isDark ? "light-mode" : "dark-mode";
            
            // Apply to both html and body for consistency
            document.documentElement.className = newTheme;
            document.body.className = "auth-body " + newTheme;
            
            localStorage.setItem("theme", newTheme);
        };
    </script>
</body>
</html>