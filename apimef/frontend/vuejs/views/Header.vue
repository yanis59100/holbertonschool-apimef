<template>
    <header>
      <nav aria-label="Navigation principale">
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/boutique">Boutique</a></li>
          <li><a href="/images">Galerie</a></li>
          <li><a href="/inscription">Inscription</a></li>
          <li><a href="/connexion">Connexion</a></li>
          <li><a href="/contact">Contact</a></li>
  
          <!-- Afficher le nom de l'utilisateur si connecté -->
          <li v-if="utilisateurConnecte">Bienvenue, {{ utilisateurConnecte }}</li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    computed: {
      // Vérifie si un utilisateur est connecté et récupère son nom
      utilisateurConnecte() {
        return localStorage.getItem("user"); // Récupère le nom de l'utilisateur dans le localStorage
      },
    },
  };
  </script>
  
  <style scoped>
  /* Styles pour la barre de navigation */
  nav ul {
    list-style-type: none;
    display: flex;
    gap: 15px;
  }
  
  nav a {
    text-decoration: none;
    color: black;
  }
  
  nav li {
    padding: 10px;
  }
  
  nav li a:hover {
    color: blue;
  }
  </style>
  