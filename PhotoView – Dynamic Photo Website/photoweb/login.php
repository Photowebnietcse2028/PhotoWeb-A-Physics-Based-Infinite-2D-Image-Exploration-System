<?php
session_start();
if($_POST){
 $_SESSION['user'] = $_POST['name'];
 header("Location: index.php");
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login - PhotoView</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body class="auth-body">
    <div class="auth-card">
        <h2>Login to PhotoView</h2>
        <form method="POST">
            <input name="name" placeholder="Name" required>
            <input name="email" placeholder="Email" required>
            <button type="submit">Login</button>
        </form>
    </div>
</body>
</html>