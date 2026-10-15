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

// Cake addition is not inserted into the database until the user places the order, 
// so we handle it in the orders route instead of having a separate endpoint for custom cakes.
// The client sends the custom cake details as part of the order data, and the server 
// processes it accordingly when creating the order. This way, we can keep all order-related 
// logic in one place and avoid unnecessary complexity in our API design.
app.post('/api/custom-cakes', (req, res) => {
    const { user_id, flavor, layers, topping } = req.body;

    if (!user_id || !flavor || !layers) {
        return res.status(400).json({ message: 'Missing cake details.' });
    }

    db.query(
        'INSERT INTO custom_cakes (user_id, flavor, layers, topping) VALUES (?, ?, ?, ?)',
        [user_id, flavor, layers, topping || null],
        (err, result) => {
            if (err) {
                console.log('Custom cake insert error:', err);
                return res.status(500).json({ message: 'Could not save cake.' });
            }
            return res.status(201).json({ 
                message: 'Cake saved!', 
                custom_cake_id: result.insertId 
            });
        }
    );
});

const port = process.env.PORT || 50000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});