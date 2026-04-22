

<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

require_once '../../config/database.php';
require_once '../../models/Comic.php';

// HANDLE PREFLIGHT (CLAVE)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON input
$data = json_decode(file_get_contents("php://input"));

if (empty($data->title)) {
    http_response_code(400);
    echo json_encode(["message" => "Title is required"]);
    exit;
}

try {

    $comic = new Comic($db);

    $result = $comic->createComic($data);

    echo json_encode([
        "message" => "Comic created successfully",
        "success" => $result
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Error creating comic",
        "error" => $e->getMessage()
    ]);
}