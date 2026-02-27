<?php
require_once __DIR__ . '/../config/app.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ComicStore Hub</title>

    <!-- Use absolute path for assets -->
    <link rel="stylesheet" href="<?= BASE_URL ?>/assets/css/style.css">
</head>
<body>

<header>
    <div class="container">
        <h1>ComicStore Hub</h1>

        <nav>
            <!-- Use BASE_URL to prevent routing issues inside subfolders -->
            <a href="<?= BASE_URL ?>/index.php">Home</a>
            <a href="<?= BASE_URL ?>/register.php">Register</a>
            <a href="<?= BASE_URL ?>/login.php">Login</a>
        </nav>
    </div>
</header>

<main>
    <div class="container">