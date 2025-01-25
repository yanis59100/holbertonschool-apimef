const stripe = require('stripe')('votre_clé_secrète_stripe'); // Remplacez par votre clé Stripe
const db = require('../db');

// Créer une commande et traiter le paiement via Stripe
exports.createOrder = async (req, res) => {
  const { utilisateur_id, panier } = req.body;

  try {
    // Calculer le montant total du panier
    const total = panier.reduce((acc, item) => acc + (item.prix * item.quantite), 0);

    // Créer un paiement via Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,  // Le montant doit être en centimes
      currency: 'eur',
      payment_method: req.body.payment_method_id,
      confirm: true,
    });

    // Sauvegarder la commande dans la base de données
    const query = 'INSERT INTO orders (utilisateur_id, montant_total) VALUES (?, ?)';
    db.query(query, [utilisateur_id, total], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur serveur');
      }

      res.status(200).json({ message: 'Commande créée avec succès', paymentIntent });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors du paiement');
  }
};
