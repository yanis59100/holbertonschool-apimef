// Fonction pour simuler la connexion de l'utilisateur
function connecter() {
    const username = prompt('Entrez votre nom d\'utilisateur:');
    if (username) {
      // Enregistrer le nom dans localStorage
      localStorage.setItem('username', username);
      // Afficher le nom d'utilisateur dans la barre de navigation
      document.getElementById('user-name').style.display = 'block';
      document.getElementById('user-name-span').textContent = username;
      // Cacher le lien de connexion une fois connecté
      document.getElementById('connexion-link').style.display = 'none';
    }
  }
  
  // Vérifier si l'utilisateur est déjà connecté
  window.onload = function() {
    const username = localStorage.getItem('username');
    if (username) {
      // Afficher le nom d'utilisateur connecté
      document.getElementById('user-name').style.display = 'block';
      document.getElementById('user-name-span').textContent = username;
      // Cacher le lien de connexion une fois connecté
      document.getElementById('connexion-link').style.display = 'none';
    } else {
      // Le lien de connexion doit être visible si aucun utilisateur n'est connecté
      document.getElementById('connexion-link').style.display = 'inline';
    }
  }
  
  // Fonction de déconnexion
  function deconnecter() {
    // Effacer le nom d'utilisateur du localStorage
    localStorage.removeItem('username');
    // Cacher le nom d'utilisateur
    document.getElementById('user-name').style.display = 'none';
    // Réafficher le lien de connexion
    document.getElementById('connexion-link').style.display = 'inline';
  }
  