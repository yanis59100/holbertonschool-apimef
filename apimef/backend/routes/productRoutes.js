const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Route pour récupérer tous les produits
router.get('/', productController.getAllProducts);

// Route pour ajouter un produit
router.post('/', productController.addProduct);

module.exports = router;
