

<?php
require 'includes/auth.php';
require 'includes/header.php';

// Protect this page
require_login();

$user = $_SESSION['user'];
?>

<h2>Dashboard</h2>

<p>Welcome, <?= htmlspecialchars($user['name']) ?>!</p>
<p>Your role: <?= htmlspecialchars($user['role']) ?></p>

<?php if (($user['role'] ?? '') === 'admin'): ?>
    <p><a href="admin/">Go to Admin Panel</a></p>
<?php endif; ?>

<p><a href="logout.php">Logout</a></p>

<?php require 'includes/footer.php'; ?>