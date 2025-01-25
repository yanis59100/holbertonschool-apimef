const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Route pour créer une commande et traiter le paiement
router.post('/', orderController.createOrder);

module.exports = router;
