const API_URL = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const userInfo = document.getElementById('user-info');
  const userNameSpan = document.getElementById('user-name');
  const logoutButton = document.getElementById('logout-btn');

  // Vérifier si un token est présent dans le localStorage
  if (token) {
    fetch(`${API_URL}/profil`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Afficher l'info utilisateur dans l'interface
        userInfo.style.display = 'block';
        userNameSpan.textContent = data.user.prenom;
      }
    })
    .catch(error => console.error('Erreur de récupération des données utilisateur:', error));
  }

  // Déconnexion
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('token');  // Supprimer le token du localStorage
    window.location.href = '/connexion';  // Rediriger vers la page de connexion
  });
});
