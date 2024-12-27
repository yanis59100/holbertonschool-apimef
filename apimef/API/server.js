const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'index.html'));
});

app.get('/boutique.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'boutique.html'));
});

app.get('/connexion.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'connexion.html'));
});

app.get('/inscription.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'inscription.html'));
});

app.get('/images.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html', 'images.html'));
});

app.use('/apimef/frontend', express.static(path.join(__dirname, '../frontend')));

app.use('/apimef/img', express.static(path.join(__dirname, '../img')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
