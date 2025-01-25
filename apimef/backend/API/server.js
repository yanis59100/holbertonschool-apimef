const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');  // Ajout pour le hachage des mots de passe
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

app.use(express.json());  // Pour parser les données JSON dans le corps de la requête
app.use('/apimef/frontend', express.static(path.join(__dirname, '../../frontend')));
app.use('/apimef/img', express.static(path.join(__dirname, '../../img')));

// Routes pour afficher les pages HTML
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

// Route pour obtenir des données (exemple pour votre table)
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

// Route d'inscription
app.post('/inscription', (req, res) => {
  const { nom, prenom, adresse, ville, codePostal, email, password } = req.body;

  // Vérifier si l'email existe déjà
  db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur de requête:', err.stack);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'Email déjà utilisé' });
    }

    // Hacher le mot de passe
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Erreur de hachage:', err.stack);
        return res.status(500).json({ success: false, message: 'Erreur de hachage du mot de passe' });
      }

      // Insérer l'utilisateur dans la base de données
      const query = 'INSERT INTO utilisateurs (nom, prenom, adresse, ville, code_postal, email, mot_de_passe) VALUES (?, ?, ?, ?, ?, ?, ?)';
      db.query(query, [nom, prenom, adresse, ville, codePostal, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Erreur lors de l\'insertion:', err.stack);
          return res.status(500).json({ success: false, message: 'Erreur d\'insertion dans la base de données' });
        }
        res.status(200).json({ success: true, message: 'Inscription réussie' });
      });
    });
  });
});

// Route de connexion
app.post('/connexion', (req, res) => {
  const { email, password } = req.body;

  // Vérifier si l'utilisateur existe
  db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur de requête:', err.stack);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    const utilisateur = results[0];

    // Comparer le mot de passe avec celui stocké dans la base de données
    bcrypt.compare(password, utilisateur.mot_de_passe, (err, isMatch) => {
      if (err) {
        console.error('Erreur de comparaison de mot de passe:', err.stack);
        return res.status(500).json({ success: false, message: 'Erreur lors de la comparaison du mot de passe' });
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
      }

      res.status(200).json({ success: true, message: 'Connexion réussie' });
    });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
