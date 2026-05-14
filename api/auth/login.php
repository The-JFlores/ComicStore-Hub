
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

$data = json_decode(file_get_contents("php://input"));

$email = trim($data->email ?? '');
$password = $data->password ?? '';

$errors = [];

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Valid email is required.";
}

if ($password === '') {
    $errors[] = "Password is required.";
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

    $query = "
        SELECT
            userID,
            name,
            email,
            password,
            role
        FROM users
        WHERE email = :email
        LIMIT 1
    ";

    $stmt = $db->prepare($query);
    $stmt->bindValue(':email', $email);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (
        !$user ||
        !password_verify($password, $user['password'])
    ) {

        http_response_code(401);

        echo json_encode([
            "success" => false,
            "message" => "Invalid email or password."
        ]);

        exit();
    }
        session_regenerate_id(true);

            $_SESSION['user'] = [
        'userID' => $user['userID'],
        'name'   => $user['name'],
        'email'  => $user['email'],
        'role'   => $user['role']
    ];

        echo json_encode([
        "success" => true,
        "message" => "Login successful.",
        "user" => $_SESSION['user']
    ]);
  } catch (PDOException $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Server error."
    ]);
}