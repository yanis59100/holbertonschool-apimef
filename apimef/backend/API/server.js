const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Connexion à la base de données MySQL
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

// Middleware pour parser le corps des requêtes en JSON
app.use(express.json());

// Middleware pour servir les fichiers statiques
app.use('/apimef/CSS', express.static(path.join(__dirname, '../../frontend/vuejs/public/CSS')));
app.use('/apimef/img', express.static(path.join(__dirname, '../../frontend/vuejs/public/img')));
app.use('/apimef/JS', express.static(path.join(__dirname, '../../frontend/vuejs/public/Javascript')));

// Routes pour afficher les pages HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/vuejs/public/index.html'));
});

app.get('/boutique', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/vuejs/public/html/boutique.html'));
});

app.get('/images', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/vuejs/public/html/images.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/vuejs/public/html/contact.html'));
});

app.get('/inscription', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/vuejs/public/html/inscription.html'));
});

app.get('/connexion', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/vuejs/public/html/connexion.html'));
});

// Route pour afficher la page de profil (HTML)
app.get('/profil', verifyToken, (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/vuejs/public/html/profil.html'));
});

// Middleware de vérification du token JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token manquant' });
  }

  jwt.verify(token, 'ma_clé_secrète_ultra_sécurisée', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token invalide' });
    }
    req.user = decoded;
    next();
  });
}

// Route pour récupérer les informations du profil utilisateur (GET)
app.get('/profil-info', verifyToken, (req, res) => {
  const userId = req.user.id; // Récupérer l'ID de l'utilisateur à partir du token

  db.query('SELECT nom, prenom, email FROM utilisateurs WHERE id = ?', [userId], (err, results) => {
    if (err) {
      console.error('Erreur de requête:', err.stack);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    res.status(200).json(results[0]);
  });
});

// Route pour modifier le profil de l'utilisateur (PUT)
app.put('/profil-modifier', verifyToken, (req, res) => {
  const userId = req.user.id;
  const { nom, prenom, email } = req.body;

  if (!nom || !prenom || !email) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont obligatoires' });
  }

  const query = 'UPDATE utilisateurs SET nom = ?, prenom = ?, email = ? WHERE id = ?';
  db.query(query, [nom, prenom, email, userId], (err, result) => {
    if (err) {
      console.error('Erreur de mise à jour:', err.stack);
      return res.status(500).json({ success: false, message: 'Erreur de mise à jour du profil' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    res.status(200).json({ success: true, message: 'Profil mis à jour avec succès' });
  });
});

// Route d'inscription (POST)
app.post('/inscription', (req, res) => {
  const { nom, prenom, email, password } = req.body;

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
      const query = 'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)';
      db.query(query, [nom, prenom, email, hashedPassword], (err, result) => {
        if (err) {
          console.error('Erreur d\'insertion:', err.stack);
          return res.status(500).json({ success: false, message: 'Erreur d\'insertion dans la base de données' });
        }

        // Créer le token JWT
        const token = jwt.sign({ id: result.insertId }, 'ma_clé_secrète_ultra_sécurisée', { expiresIn: '1h' });

        res.status(200).json({ success: true, message: 'Inscription réussie', token });
      });
    });
  });
});

// Route de connexion (POST)
app.post('/connexion', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur de requête:', err.stack);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    const utilisateur = results[0];

    bcrypt.compare(password, utilisateur.mot_de_passe, (err, isMatch) => {
      if (err) {
        console.error('Erreur de comparaison de mot de passe:', err.stack);
        return res.status(500).json({ success: false, message: 'Erreur lors de la comparaison du mot de passe' });
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
      }

      // Créer le token JWT
      const token = jwt.sign({ id: utilisateur.id }, 'ma_clé_secrète_ultra_sécurisée', { expiresIn: '1h' });

      res.status(200).json({ success: true, message: 'Connexion réussie', token });
    });
  });
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
