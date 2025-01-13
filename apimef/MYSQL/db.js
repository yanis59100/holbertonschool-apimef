// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Remplacez par votre nom d'utilisateur MySQL
  password: 'password', // Remplacez par votre mot de passe MySQL
  database: 'apimef'    // Remplacez par le nom de votre base de données
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL avec l\'ID de connexion ' + connection.threadId);
});

module.exports = connection;
