document.getElementById('connexion-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const utilisateur = {
        email: email,
        password: password
    };

    fetch('http://localhost:3000/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(utilisateur)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Connexion réussie !');
            window.location.href = 'dashboard.html';
        } else {
            alert('Erreur: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
        alert('Une erreur est survenue, veuillez réessayer plus tard.');
    });
});
