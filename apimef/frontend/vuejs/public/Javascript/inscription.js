document.getElementById('inscription-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const adresse = document.getElementById('adresse').value;
    const ville = document.getElementById('ville').value;
    const codePostal = document.getElementById('code_postal').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;

    // Validation simple
    if (!nom || !prenom || !adresse || !ville || !codePostal || !email || !password || !confirmPassword) {
        alert('Tous les champs doivent être remplis.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    const utilisateur = {
        nom: nom,
        prenom: prenom,
        adresse: adresse,
        ville: ville,
        codePostal: codePostal,
        email: email,
        password: password
    };

    fetch('http://localhost:3000/inscription', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(utilisateur)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Inscription réussie !');
            window.location.href = 'connexion.html';
        } else {
            alert('Erreur: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue, veuillez réessayer plus tard.');
    });
});
