// server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 50000;

// MySQL connection configuration
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306
});

// Ensuring the MySQL connection is established
db.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
        return;
    }
    console.log("Connected to MySQL database!");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});