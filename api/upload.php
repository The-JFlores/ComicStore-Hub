<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$targetDir = __DIR__ . "/../uploads/";

// Create uploads folder if it doesn't exist
if (!file_exists($targetDir)) {
    mkdir($targetDir, 0777, true);
}

// Check if file exists
if (isset($_FILES["file"])) {
    $fileName = time() . "_" . basename($_FILES["file"]["name"]);
    $targetFile = $targetDir . $fileName;

    // Move uploaded file
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
        echo json_encode([
            "success" => true,
            "fileName" => $fileName
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            "success" => false,
            "message" => "Failed to move uploaded file"
        ]);
    }

} else {

    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "No file uploaded"
    ]);
}