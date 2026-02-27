

<?php
// includes/auth.php

if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

// true/false
function is_logged_in(): bool {
  return isset($_SESSION["user"]);
}

// Sends you to login if there is no session
function require_login(): void {
  if (!is_logged_in()) {
    header("Location: /login.php");
    exit;
  }
}

// require_role("admin") por ejemplo
function require_role(string $role): void {
  require_login();
  if (($_SESSION["user"]["role"] ?? "") !== $role) {
    http_response_code(403);
    echo "403 - Forbidden";
    exit;
  }
}