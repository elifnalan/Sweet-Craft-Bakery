// server.js
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);

app.get('/api/desserts', (req, res) => {
    db.query('SELECT * FROM desserts', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

const port = process.env.PORT || 50000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});