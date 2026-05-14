<?php

header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
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

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$items = $data['items'] ?? [];

if (empty($items)) {

    http_response_code(400);
    echo json_encode([
        "success" => false,
        "message" => "Cart is empty."
    ]);

    exit();
}

$total = 0;

foreach ($items as $item) {

    $total += (float)$item['price'];
}

try {

    $query = "
        INSERT INTO orders (
            userID,
            total
        )
        VALUES (
            :userID,
            :total
        )
    ";

    $stmt = $db->prepare($query);
    $stmt->bindValue(':userID', $userID);
    $stmt->bindValue(':total', $total);
    $stmt->execute();

    $orderID = $db->lastInsertId();

        foreach ($items as $item) {

        $itemQuery = "
            INSERT INTO order_items (
                orderID,
                comicID,
                price
            )
            VALUES (
                :orderID,
                :comicID,
                :price
            )
        ";

        $itemStmt = $db->prepare($itemQuery);
        $itemStmt->bindValue(
            ':orderID',
            $orderID
        );

        $itemStmt->bindValue(
            ':comicID',
            $item['comicID']
        );

        $itemStmt->bindValue(
            ':price',
            $item['price']
        );

        $itemStmt->execute();
    }

        echo json_encode([
        "success" => true,
        "message" => "Order created successfully.",
        "orderID" => $orderID
    ]);

} catch (PDOException $e) {

    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Server error."
    ]);
}