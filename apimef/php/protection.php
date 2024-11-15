<?php
session_start();

if (!isset($_SESSION['utilisateur_id'])) {
    header("Location: connexion.html"); // Redirige si non connecté
    exit();
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tableau de Bord</title>
</head>
<body>
    <h1>Bienvenue, <?php echo htmlspecialchars($_SESSION['nom']); ?> !</h1>
    <p>Vous êtes connecté.</p>
    <a href="deconnexion.php">Se déconnecter</a>
</body>
</html>
