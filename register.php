<?php
require 'config/database.php';
require 'includes/header.php';

$errors = [];
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanitize input
    $name = trim($_POST['name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Basic validation
    if ($name === '') {
        $errors[] = "Name is required.";
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required.";
    }

    if (strlen($password) < 6) {
        $errors[] = "Password must be at least 6 characters.";
    }

    if (empty($errors)) {

        try {

            // Check if email already exists
            $checkQuery = "SELECT userID FROM users WHERE email = :email LIMIT 1";
            $checkStmt = $db->prepare($checkQuery);
            $checkStmt->bindValue(':email', $email);
            $checkStmt->execute();

            if ($checkStmt->fetch()) {
                $errors[] = "Email is already registered.";
            } else {

                // Hash password securely
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

                // Insert new user with default role
                $query = "INSERT INTO users (name, email, password, role) 
                          VALUES (:name, :email, :password, 'user')";

                $statement = $db->prepare($query);

                $statement->bindValue(':name', $name);
                $statement->bindValue(':email', $email);
                $statement->bindValue(':password', $hashedPassword);

                $statement->execute();

                $success = "User registered successfully!";
            }

        } catch (PDOException $e) {
            $errors[] = "Something went wrong. Please try again.";
        }
    }
}
?>

<h2>Create Account</h2>

<?php if (!empty($errors)): ?>
    <ul style="color:red;">
        <?php foreach ($errors as $error): ?>
            <li><?= htmlspecialchars($error) ?></li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>

<?php if ($success): ?>
    <p style="color:green;"><?= htmlspecialchars($success) ?></p>
<?php endif; ?>

<form method="POST" action="register.php">

    <label>Name:</label><br>
    <input type="text" name="name" required><br><br>

    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>

    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>

    <button type="submit">Register</button>

</form>

<?php
require __DIR__ . '/includes/footer.php';
?>