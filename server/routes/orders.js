const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST /api/orders - Create a new order
router.post('/', (req, res) => {
    const { user_id, items, total_price } = req.body;

    if (!user_id || !items || items.length === 0) {
        return res.status(400).json({ message: 'Missing order details.' });
    }

    db.query(
        'INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)',
        [user_id, total_price, 'pending'],
        (err, result) => {
            if (err) return res.status(500).json({ message: 'Could not create order.' });

            const order_id = result.insertId;

            const orderItems = items.map(item => [
                order_id,
                item.dessert_id || null,
                item.custom_cake_id || null,
                item.quantity
            ]);

            db.query(
                'INSERT INTO order_items (order_id, dessert_id, custom_cake_id, quantity) VALUES ?',
                [orderItems],
                (err) => {
                    if (err) return res.status(500).json({ message: 'Could not save order items.' });
                    return res.status(201).json({
                        message: 'Order placed successfully!',
                        order_id
                    });
                }
            );
        }
    );
});

// GET /api/orders/:user_id - Get all orders with items for a user
router.get('/:user_id', (req, res) => {
    const { user_id } = req.params;

    db.query(
        `SELECT o.id, o.total_price, o.status, o.created_at
         FROM orders o
         WHERE o.user_id = ?
         ORDER BY o.created_at DESC`,
        [user_id],
        (err, orders) => {
            if (err) return res.status(500).json({ message: 'Could not fetch orders.' });
            if (orders.length === 0) return res.status(200).json([]);

            // For each order, fetch its items
            const orderPromises = orders.map(order => {
                return new Promise((resolve, reject) => {
                    db.query(
                        `SELECT oi.id, oi.dessert_id, oi.custom_cake_id, oi.quantity,
                                d.name, d.price, d.image
                         FROM order_items oi
                         LEFT JOIN desserts d ON oi.dessert_id = d.id
                         WHERE oi.order_id = ?`,
                        [order.id],
                        (err, items) => {
                            if (err) reject(err);
                            else resolve({ ...order, items });
                        }
                    );
                });
            });

            Promise.all(orderPromises)
                .then(ordersWithItems => res.status(200).json(ordersWithItems))
                .catch(() => res.status(500).json({ message: 'Could not fetch order items.' }));
        }
    );
});

module.exports = router;