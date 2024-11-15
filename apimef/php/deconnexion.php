<?php
session_start();
session_destroy();
header("Location: connexion.html");
exit();
?>
