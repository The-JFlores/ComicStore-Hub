
<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {

    http_response_code(200);
    exit();
}

session_start();

require_once '../../config/database.php';
if (!isset($_SESSION['user'])) {

    http_response_code(401);
    echo json_encode([
        "success" => false,
        "message" => "Unauthorized"
    ]);
    exit();
}

$userID = $_SESSION['user']['userID'];

try {

    $query = "
        SELECT
            orderID,
            total,
            created_at
        FROM orders
        WHERE userID = :userID
        ORDER BY created_at DESC
    ";

    $stmt = $db->prepare($query);
    $stmt->bindValue(':userID', $userID);
    $stmt->execute();
    $orders = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "orders" => $orders
    ]);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server error."
    ]);
}