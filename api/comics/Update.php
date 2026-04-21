

<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

// 🔥 CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';
require_once '../../models/Comic.php';

$data = json_decode(file_get_contents("php://input"));

try {

    if (empty($data->comicID)) {
        http_response_code(400);
        echo json_encode(["message" => "comicID is required"]);
        exit;
    }

    $comic = new Comic($db);

    $result = $comic->updateComic($data);

    echo json_encode([
        "message" => "Comic updated successfully",
        "success" => $result
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Error updating comic",
        "error" => $e->getMessage()
    ]);
}