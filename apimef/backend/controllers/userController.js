const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

// Inscription d'un utilisateur
exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  db.query(query, [username, email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }
    res.status(201).json({ message: 'Utilisateur créé avec succès' });
  });
};

// Connexion d'un utilisateur
exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const user = results[0];
    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
    }

    const token = jwt.sign({ id: user.id }, 'votre_clé_secrète_jwt', { expiresIn: '1h' });
    res.status(200).json({ token });
  });
};
