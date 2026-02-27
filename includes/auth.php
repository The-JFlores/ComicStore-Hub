<?php
require_once __DIR__ . '/../config/app.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function is_logged_in(): bool {
    return isset($_SESSION['user']);
}

function require_login(): void {
    if (!is_logged_in()) {
        // Use absolute project path to avoid /admin/login.php issues
        header("Location: " . BASE_URL . "/login.php");
        exit;
    }
}

function require_role(string $role): void {
    require_login();

    // Enforce role-based access
    if (($_SESSION['user']['role'] ?? '') !== $role) {
        http_response_code(403);
        echo "403 - Forbidden";
        exit;
    }
}