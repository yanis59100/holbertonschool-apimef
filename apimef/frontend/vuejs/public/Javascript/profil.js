// Récupérer le token JWT du stockage local (localStorage ou autre)
const token = localStorage.getItem('jwt_token');

// Vérifier si le token existe
if (!token) {
  alert("Vous devez être connecté pour voir votre profil.");
  window.location.href = "/connexion"; // Rediriger si non connecté
}

// Récupérer les informations du profil depuis l'API
async function fetchUserProfile() {
  try {
    const response = await fetch('/profil', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Erreur de récupération des informations utilisateur');
    }

    const data = await response.json();
    if (data.success) {
      document.getElementById('nom').textContent = data.user.nom;
      document.getElementById('prenom').textContent = data.user.prenom;
      document.getElementById('email').textContent = data.user.email;
    } else {
      alert('Utilisateur non trouvé');
    }
  } catch (error) {
    console.error(error);
  }
}

// Afficher le formulaire d'édition
document.getElementById('edit-profile').addEventListener('click', () => {
  document.getElementById('profil-info').style.display = 'none';
  document.getElementById('profil-edit').style.display = 'block';

  // Remplir les champs avec les valeurs actuelles
  document.getElementById('edit-nom').value = document.getElementById('nom').textContent;
  document.getElementById('edit-prenom').value = document.getElementById('prenom').textContent;
  document.getElementById('edit-email').value = document.getElementById('email').textContent;
});

// Mettre à jour les informations utilisateur
document.getElementById('edit-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const nom = document.getElementById('edit-nom').value;
  const prenom = document.getElementById('edit-prenom').value;
  const email = document.getElementById('edit-email').value;

  const response = await fetch('/profil', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ nom, prenom, email })
  });

  const data = await response.json();
  if (data.success) {
    alert('Profil mis à jour avec succès');
    fetchUserProfile(); // Rafraîchir les informations affichées
    document.getElementById('profil-info').style.display = 'block';
    document.getElementById('profil-edit').style.display = 'none';
  } else {
    alert('Erreur lors de la mise à jour du profil');
  }
});

// Charger les informations du profil lors du chargement de la page
fetchUserProfile();
