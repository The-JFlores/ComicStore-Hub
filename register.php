<?php
require 'config/database.php';
require 'includes/header.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $query = "INSERT INTO users (name, email, password) 
                  VALUES (:name, :email, :password)";

        $statement = $db->prepare($query);

        $statement->bindValue(':name', $name);
        $statement->bindValue(':email', $email);
        $statement->bindValue(':password', $hashedPassword);

        $statement->execute();

        echo "<p style='color:green;'>User registered successfully!</p>";

    } catch (PDOException $e) {
        echo "<p style='color:red;'>Error: " . $e->getMessage() . "</p>";
    }
}
?>

<h2>Create Account</h2>

<form method="POST" action="register.php">

    <label>Name:</label><br>
    <input type="text" name="name" required><br><br>

    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>

    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>

    <button type="submit">Register</button>

</form>

</form>

<?php
require __DIR__ . '/includes/footer.php';
?>