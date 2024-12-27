const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Route pour la page d'accueil (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'index.html'));
});

// Route pour /boutique qui doit servir boutique.html
app.get('/boutique', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'boutique.html'));
});

// Route pour /connexion qui sert connexion.html
app.get('/connexion', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'connexion.html'));
});

// Route pour /inscription qui sert inscription.html
app.get('/inscription', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'inscription.html'));
});

// Route pour /images qui sert images.html
app.get('/images', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'images.html'));
});

// Serveur les fichiers statiques (CSS, JS, images)
app.use('/apimef/frontend', express.static(path.join(__dirname, '../frontend')));
app.use('/apimef/img', express.static(path.join(__dirname, '../img')));

// Lancer le serveur sur le port 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
