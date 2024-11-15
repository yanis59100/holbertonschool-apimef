<?php
session_start(); // Démarrer la session

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = htmlspecialchars($_POST['email']);
    $password = $_POST['password'];

    // Connexion à la base de données
    $conn = new mysqli('localhost', 'root', '', 'inscriptions_db');

    if ($conn->connect_error) {
        die("Échec de connexion : " . $conn->connect_error);
    }

    // Vérification des informations
    $sql = "SELECT * FROM utilisateurs WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Vérifier le mot de passe
        if (password_verify($password, $user['mot_de_passe'])) {
            $_SESSION['utilisateur_id'] = $user['id'];
            $_SESSION['nom'] = $user['nom'];

            echo "Connexion réussie ! Bienvenue, " . $user['nom'] . ".";
            // Redirection vers une page protégée, si nécessaire
            // header("Location: tableau_de_bord.php");
        } else {
            echo "Mot de passe incorrect.";
        }
    } else {
        echo "Aucun utilisateur trouvé avec cet email.";
    }

    $stmt->close();
    $conn->close();
}
?>
