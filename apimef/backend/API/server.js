const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2d2cea37e2',
  database: 'apimef_db'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

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

app.get('/data', (req, res) => {
  db.query('SELECT * FROM your_table_name', (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête:', err.stack);
      res.status(500).send('Erreur serveur');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
