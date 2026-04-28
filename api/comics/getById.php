<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../../config/database.php';

$id = $_GET['id'] ?? null;

if (!$id) {
    echo json_encode(null);
    exit;
}

try {
    $stmt = $db->prepare("SELECT * FROM comics WHERE comicID = :id");
    $stmt->bindParam(":id", $id, PDO::PARAM_INT);
    $stmt->execute();

    $comic = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($comic ?: null);

} catch (Exception $e) {
    echo json_encode([
        "error" => $e->getMessage()
    ]);
}