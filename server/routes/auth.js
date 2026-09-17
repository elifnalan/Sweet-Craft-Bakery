const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate inputs
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Check if email already exists
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error.' });

            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already in use.' });
            }

            // Hash the password
            const password_hash = await bcrypt.hash(password, 10);

            // Insert new user
            db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
                [username, email, password_hash],
                (err, result) => {
                    if (err) return res.status(500).json({ message: 'Could not create user.' });
                    return res.status(201).json({ message: 'Registration successful!' });
                }
            );
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ message: 'Database error.' });

            if (results.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const user = results[0];
            console.log('User found:', user); // ← add this

            // Compare password
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: user.id, name: user.name, email: user.email }, // ← change user.username to user.name
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            console.log('Sending user:', {id: user.id, name: user.name, email: user.email}); // ← add thi
            return res.status(200).json({
                token,
                user: { id: user.id, name: user.name, email: user.email }
            });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    } 
});

module.exports = router;