const db = require('../db');

// Récupérer tous les produits
exports.getAllProducts = (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }
    res.json(results);
  });
};

// Ajouter un produit
exports.addProduct = (req, res) => {
  const { nom, prix, description } = req.body;

  const query = 'INSERT INTO products (nom, prix, description) VALUES (?, ?, ?)';
  db.query(query, [nom, prix, description], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erreur serveur');
    }
    res.status(201).json({ message: 'Produit ajouté avec succès' });
  });
};
