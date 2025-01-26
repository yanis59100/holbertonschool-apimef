const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'votre_secret'; // Vous pouvez mettre votre secret ici

function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]; // Extraire le token de l'en-tête Authorization

  if (!token) {
    return res.status(401).json({ success: false, message: 'Accès refusé, token manquant' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token invalide ou expiré' });
    }
    req.user = user; // Stocker l'utilisateur dans la requête pour un accès ultérieur
    next();
  });
}

module.exports = authenticateToken;
