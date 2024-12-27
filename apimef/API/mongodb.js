// Importer MongoClient depuis la bibliothèque mongodb
const { MongoClient } = require('mongodb');

// URL de connexion à MongoDB (remplacer par votre URL si besoin)
const url = 'mongodb://127.0.0.1:27017'; // Localhost pour une installation locale
const dbName = 'apimef'; // Nom de la base de données

// Créer une fonction pour se connecter à MongoDB
async function connectToMongo() {
  try {
    // Connexion à MongoDB
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connexion réussie à MongoDB');

    // Accéder à la base de données
    const db = client.db(dbName);
    
    // Retourner la connexion MongoDB
    return db;
  } catch (err) {
    console.error('Erreur de connexion MongoDB:', err);
    throw err;
  }
}

// Exporter la fonction de connexion pour l'utiliser dans d'autres fichiers
module.exports = { connectToMongo };
