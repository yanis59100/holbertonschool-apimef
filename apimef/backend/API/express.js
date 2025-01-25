// Updated backend structure for your e-commerce project

// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const db = require('./config/db');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const helmet = require('helmet');
const cors = require('cors');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Static files
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));
app.use('/images', express.static(path.join(__dirname, '../img')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = connection;


// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all products
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch products.' });
      return;
    }
    res.json(results);
  });
});

// Create a new product
router.post('/', (req, res) => {
  const { name, price, description } = req.body;
  db.query(
    'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
    [name, price, description],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create product.' });
        return;
      }
      res.status(201).json({ message: 'Product created successfully.', productId: result.insertId });
    }
  );
});

module.exports = router;


// routes/users.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// User registration
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users (username, password) VALUES (?, ?)',
    [username, hashedPassword],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register user.' });
        return;
      }
      res.status(201).json({ message: 'User registered successfully.' });
    }
  );
});

// User login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) {
      res.status(401).json({ error: 'Invalid username or password.' });
      return;
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid username or password.' });
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful.', token });
  });
});

module.exports = router;


// .env example
// DB_HOST=localhost
// DB_USER=root
// DB_PASSWORD=yourpassword
// DB_NAME=apimef_db
// JWT_SECRET=yourjwtsecret
// PORT=3000


// SQL to create required tables
/*
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
*/
