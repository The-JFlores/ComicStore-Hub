
<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();

$_SESSION = [];

session_destroy();

echo json_encode([
    "success" => true,
    "message" => "Logged out successfully."
]);