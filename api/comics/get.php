

<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Content-Type: application/json');

require_once '../../config/database.php';
require_once '../../models/Comic.php';

try {

    // Create Comic model instance
    $comic = new Comic($db);

    // Get all comics using the model
    $comics = $comic->getAllComics();

    // Return JSON response
    echo json_encode($comics);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Failed to fetch comics",
        "error" => $e->getMessage()
    ]);
}