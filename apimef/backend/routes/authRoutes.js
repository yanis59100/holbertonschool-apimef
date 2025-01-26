const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
require('dotenv').config();

// Vérification que la clé secrète JWT est définie
if (!process.env.JWT_SECRET) {
  console.error("Erreur : JWT_SECRET n'est pas défini dans le fichier .env");
  process.exit(1);
}

// Connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'apimef_db',
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// Route d'inscription
router.post('/inscription', (req, res) => {
  const { nom, prenom, adresse, ville, codePostal, email, password } = req.body;

  // Validation des champs d'entrée
  if (!nom || !prenom || !adresse || !ville || !codePostal || !email || !password) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont obligatoires' });
  }

  db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur de requête:', err.stack);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: 'Email déjà utilisé' });
    }

    // Hachage du mot de passe
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Erreur de hachage:', err.stack);
        return res.status(500).json({ success: false, message: 'Erreur de hachage du mot de passe' });
      }

      const query = `
        INSERT INTO utilisateurs 
        (nom, prenom, adresse, ville, code_postal, email, mot_de_passe) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(query, [nom, prenom, adresse, ville, codePostal, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("Erreur lors de l'insertion:", err.stack);
          return res.status(500).json({ success: false, message: "Erreur d'insertion dans la base de données" });
        }

        res.status(200).json({ success: true, message: 'Inscription réussie' });
      });
    });
  });
});

// Route de connexion
router.post('/connexion', (req, res) => {
  const { email, password } = req.body;

  // Validation des champs d'entrée
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe sont obligatoires' });
  }

  db.query('SELECT * FROM utilisateurs WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Erreur de requête:', err.stack);
      return res.status(500).json({ success: false, message: 'Erreur serveur' });
    }

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
    }

    const utilisateur = results[0];

    // Comparaison du mot de passe
    bcrypt.compare(password, utilisateur.mot_de_passe, (err, isMatch) => {
      if (err) {
        console.error('Erreur de comparaison de mot de passe:', err.stack);
        return res.status(500).json({ success: false, message: 'Erreur lors de la comparaison du mot de passe' });
      }

      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Email ou mot de passe incorrect' });
      }

      // Génération d'un token JWT
      const token = jwt.sign(
        { id: utilisateur.id, email: utilisateur.email },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
      );

      res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        token,
      });
    });
  });
});

module.exports = router;
