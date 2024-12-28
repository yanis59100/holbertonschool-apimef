const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/apimef/frontend', express.static(path.join(__dirname, '../../frontend')));
app.use('/apimef/img', express.static(path.join(__dirname, '../../img')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/html/index.html'));
});

app.get('/boutique', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/html/boutique.html'));
});

app.get('/connexion', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/html/connexion.html'));
});

app.get('/inscription', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/html/inscription.html'));
});

app.get('/images', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/html/images.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/html/contact.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
