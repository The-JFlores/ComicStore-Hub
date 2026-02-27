

<?php
require 'includes/auth.php';

// Clear all session data
$_SESSION = [];

// Destroy the session completely
session_destroy();

// Redirect to login
header("Location: login.php");
exit;