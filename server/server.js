// server.js
// Importing necessary modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const port = 50000;

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'sc_bakery',
    port: 3306
});

// Ensuring the MySQL connection is established
db.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
        return;
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});