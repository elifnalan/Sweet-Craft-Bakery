import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Orders.css';

function Orders() {
    const { user } = useUser();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        fetch(`http://localhost:50000/api/orders/${user.id}`)
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [user, navigate]);

    const getStatusEmoji = (status) => {
        const emojis = {
            pending: '⏳',
            preparing: '👩‍🍳',
            ready: '🎉',
            delivered: '✅'
        };
        return emojis[status] || '⏳';
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: '#F2A97E',
            preparing: '#D4A5C9',
            ready: '#C97B5E',
            delivered: '#6B3A28'
        };
        return colors[status] || '#F2A97E';
    };

    if (loading) {
        return (
            <div className="orders-page">
                <h1 className="orders-title">✨ My Orders ✨</h1>
                <p className="orders-loading">Loading your orders... 🍪</p>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="star" style={{ top: '4%', left: '5%', fontSize: '10px', animationDuration: '2.1s' }}>✦</div>
            <div className="star" style={{ top: '8%', left: '20%', fontSize: '7px', animationDuration: '3.2s' }}>✦</div>
            <div className="star" style={{ top: '3%', left: '70%', fontSize: '14px', animationDuration: '2.7s' }}>✦</div>
            <div className="star" style={{ top: '6%', left: '88%', fontSize: '8px', animationDuration: '1.9s' }}>✦</div>

            <h1 className="orders-title">✨ My Orders ✨</h1>

            {orders.length === 0 ? (
                <div className="orders-empty">
                    <div className="orders-empty-emoji">🍰</div>
                    <p className="orders-empty-msg">No orders yet!</p>
                    <p className="orders-empty-sub">Go treat yourself 😊</p>
                    <button className="orders-shop-btn" onClick={() => navigate('/desserts')}>
                        Start Shopping 🛒
                    </button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map(order => (
                        <div key={order.id} className="order-card">
                            <div className="order-card-header">
                                <div className="order-id">Order #{order.id}</div>
                                <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                                    {getStatusEmoji(order.status)} {order.status}
                                </div>
                            </div>

                            <div className="order-date">
                                🗓️ {new Date(order.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric',
                                    hour: '2-digit', minute: '2-digit'
                                })}
                            </div>

                            <hr className="order-divider" />

                            <div className="order-items">
                                {order.items && order.items.map(item => (
                                    <div key={item.id} className="order-item">
                                        <span className="order-item-emoji">🍽️</span>
                                        <span className="order-item-name">
                                            {item.name || 'Custom Cake 🎂'}
                                        </span>
                                        <span className="order-item-qty">x{item.quantity}</span>
                                     <span className="order-item-price">
                                        {item.name 
                                            ? `$${(item.price * item.quantity).toFixed(2)}`  // dessert
                                            : `$${parseFloat(order.total_price).toFixed(2)}` // custom cake
                                        }
                                    </span>
                                    </div>
                                ))}
                            </div>

                            <hr className="order-divider" />

                            <div className="order-total">
                                <span>✨ Total</span>
                                <span className="order-total-amount">${parseFloat(order.total_price).toFixed(2)}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Orders;