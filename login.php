

<?php
require 'config/database.php';
require 'includes/auth.php';
require 'includes/header.php';

$errors = [];

// If user is already logged in, redirect to dashboard
if (is_logged_in()) {
    header("Location: dashboard.php");
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Sanitize input
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Basic validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required.";
    }

    if ($password === '') {
        $errors[] = "Password is required.";
    }

    if (empty($errors)) {
        try {
            // Find user by email
            $query = "SELECT userID, name, email, password, role 
                      FROM users 
                      WHERE email = :email 
                      LIMIT 1";

            $statement = $db->prepare($query);
            $statement->bindValue(':email', $email);
            $statement->execute();

            $user = $statement->fetch(PDO::FETCH_ASSOC);

            // Verify password
            if (!$user || !password_verify($password, $user['password'])) {
                $errors[] = "Invalid email or password.";
            } else {
                // Prevent session fixation
                session_regenerate_id(true);

                // Store only necessary user data in session (never store password)
                $_SESSION['user'] = [
                    'userID' => $user['userID'],
                    'name'   => $user['name'],
                    'email'  => $user['email'],
                    'role'   => $user['role'] ?? 'user'
                ];

                header("Location: dashboard.php");
                exit;
            }

        } catch (PDOException $e) {
            $errors[] = "Something went wrong. Please try again.";
        }
    }
}
?>

<h2>Login</h2>

<?php if (!empty($errors)): ?>
    <ul style="color:red;">
        <?php foreach ($errors as $error): ?>
            <li><?= htmlspecialchars($error) ?></li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>

<form method="POST" action="login.php">

    <label>Email:</label>
    <input type="email" name="email" required>

    <label>Password:</label>
    <input type="password" name="password" required>

    <button type="submit">Login</button>

</form>

<?php require 'includes/footer.php'; ?>