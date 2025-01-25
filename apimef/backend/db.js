const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2d2cea37e2',
  database: 'apimef_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données: ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL avec l\'ID de connexion ' + connection.threadId);
});

module.exports = connection;
