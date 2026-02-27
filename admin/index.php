

<?php
require '../includes/auth.php';
require '../includes/header.php';

// Only admins can access this page
require_role('admin');
?>

<h2>Admin Panel</h2>
<p>Only administrators can access this section.</p>

<p><a href="../dashboard.php">Back to Dashboard</a></p>

<?php require '../includes/footer.php'; ?>