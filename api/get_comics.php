

<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, OPTIONS');

require_once '../config/database.php';

// Return JSON response
header('Content-Type: application/json');

try {
    // Query all comics with their genre name
    $sql = "
        SELECT 
            c.comicID,
            c.title,
            c.author,
            c.publisher,
            c.genreID,
            g.name AS genreName,
            c.price,
            c.description,
            c.cover_image,
            c.file_path,
            c.created_at
        FROM comics c
        LEFT JOIN genres g ON c.genreID = g.genreID
        ORDER BY c.comicID DESC
    ";

    $stmt = $db->prepare($sql);
    $stmt->execute();

    // Fetch all comics as an associative array
    $comics = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the comics list as JSON
    echo json_encode($comics);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Failed to fetch comics",
        "error" => $e->getMessage()
    ]);
}