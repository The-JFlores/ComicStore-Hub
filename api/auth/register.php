
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../../config/database.php';

$data = json_decode(file_get_contents("php://input"));
$name = trim($data->name ?? '');
$email = trim($data->email ?? '');
$password = $data->password ?? '';
$errors = [];

if ($name === '') {
    $errors[] = "Name is required.";
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Valid email is required.";
}

if (strlen($password) < 6) {
    $errors[] = "Password must be at least 6 characters.";
}

if (!empty($errors)) {

    http_response_code(400);
    echo json_encode([
        "success" => false,
        "errors" => $errors
    ]);

    exit();
}

try {

    $checkQuery = "
        SELECT userID
        FROM users
        WHERE email = :email
        LIMIT 1
    ";

    $checkStmt = $db->prepare($checkQuery);
    $checkStmt->bindValue(':email', $email);
    $checkStmt->execute();

    if ($checkStmt->fetch()) {

        http_response_code(400);
        echo json_encode([
            "success" => false,
            "message" => "Email already registered."
        ]);
        
        exit();
    }

        $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

        $insertQuery = "
        INSERT INTO users (
            name,
            email,
            password,
            role
        ) VALUES (
            :name,
            :email,
            :password,
            'user'
        )
    ";

    $insertStmt = $db->prepare($insertQuery);

    $insertStmt->bindValue(':name', $name);
    $insertStmt->bindValue(':email', $email);
    $insertStmt->bindValue(':password', $hashedPassword);

    $insertStmt->execute();

        echo json_encode([
        "success" => true,
        "message" => "User registered successfully."
    ]);
    } catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Server error."
    ]);
}