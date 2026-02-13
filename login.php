

<?php
require 'config/database.php';
session_start();
require 'includes/header.php';
?>

<h2>Login</h2>

<form method="POST" action="login.php">

    <label>Email:</label>
    <input type="email" name="email" required>

    <label>Password:</label>
    <input type="password" name="password" required>

    <button type="submit">Login</button>

</form>

<?php require 'includes/footer.php'; ?>