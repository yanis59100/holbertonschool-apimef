const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prix: {
    type: Number,
    required: true
  },
  quantite: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Produit = mongoose.model('Produit', produitSchema);

module.exports = Produit;
