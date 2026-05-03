import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/Cart.css';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const { user } = useUser();
    const navigate = useNavigate();
    const { cart, removeFromCart, addToCart, decreaseQuantity, clearCart } = useCart();
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const total = cart.reduce((sum, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return sum + price * item.quantity;
    }, 0);

    const placeOrder = async () => {
        if (!user) {
            setMessage('Please login to place an order! 🍪');
            setMessageType('error');
            setTimeout(() => {
                setMessage('');
                navigate('/login');
            }, 2000);
            return;
        }

        const orderData = {
            user_id: user.id,
            total_price: total,
            items: cart.map(item => ({
                dessert_id: item.id,
                custom_cake_id: null,
                quantity: item.quantity
            }))
        };

        try {
            const response = await fetch('http://localhost:50000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage('Could not place order. Please try again. 😢');
                setMessageType('error');
                setTimeout(() => setMessage(''), 3000);
            } else {
                clearCart();
                setMessage(`Order placed! 🎂 Order #${data.order_id} confirmed!`);
                setMessageType('success');
                setTimeout(() => {
                    setMessage('');
                    navigate('/');
                }, 2500);
            }
        } catch (err) {
            setMessage('Could not connect to server. Please try again. 😢');
            setMessageType('error');
            setTimeout(() => setMessage(''), 3000);
        }
    };

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                {message && (
                    <div className={`cart-toast ${messageType}`}>
                        {message}
                    </div>
                )}
                <h1 className="cart-title">✨ Your Cart ✨</h1>
                <div className="cart-empty">
                    <p className="empty-msg">Your cart is empty! 🍪</p>
                    <a href="/desserts" className="shop-btn">Go Shopping</a>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            {message && (
                <div className={`cart-toast ${messageType}`}>
                    {message}
                </div>
            )}

            <div className="star" style={{ top: '4%', left: '5%', fontSize: '10px', animationDuration: '2.1s' }}>✦</div>
            <div className="star" style={{ top: '8%', left: '20%', fontSize: '7px', animationDuration: '3.2s' }}>✦</div>
            <div className="star" style={{ top: '3%', left: '70%', fontSize: '14px', animationDuration: '2.7s' }}>✦</div>
            <div className="star" style={{ top: '6%', left: '88%', fontSize: '8px', animationDuration: '1.9s' }}>✦</div>

            <h1 className="cart-title">✨ Your Cart ✨</h1>

            <div className="receipt">
                <div className="receipt-header">
                    <div className="receipt-shop">🎂 Sweet Craft Bakery</div>
                    <div className="receipt-date">✦ ORDER RECEIPT ✦</div>
                </div>

                <hr className="receipt-divider" />

                {cart.map(item => (
                    <div key={item.id} className="receipt-item">
                        <img src={item.img} alt={item.name} className="receipt-item-img" />
                        <div className="receipt-item-info">
                            <div className="receipt-item-name">{item.name}</div>
                            <div className="receipt-item-desc">{item.description}</div>
                        </div>
                        <div className="receipt-item-qty">
                            <button className="qty-btn" onClick={() => decreaseQuantity(item.id)}>-</button>
                            <span className="qty">{item.quantity}</span>
                            <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                        </div>
                        <div className="receipt-item-price">
                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                        </div>
                        <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                    </div>
                ))}

                <hr className="receipt-divider" />

                <div className="receipt-total">
                    <div className="receipt-total-label">✨ Total</div>
                    <div className="receipt-total-amount">${total.toFixed(2)}</div>
                </div>

                <div className="receipt-footer">
                    <div className="receipt-msg">Thank you for your sweet order! 🍰</div>
                    <button className="order-btn" onClick={placeOrder}>Place Order 🎂</button>
                    <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;