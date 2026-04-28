import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

function Welcome() {
    return (
        <>
            {/* Hero */}
            <section className="welcome-hero">
                <div className="welcome-emoji-row">
                    🎂 🍰 🧁 🍪 🎀
                </div>
                <h1 className="welcome-title">Baked with Love,<br />Made for You</h1>
                <p className="welcome-subtitle">
                    Handcrafted cakes, pastries, and custom creations.
                    Made fresh every day just for you. 🍓
                </p>
                <div className="scroll-indicator">
                    <span>scroll down</span>
                    <div className="scroll-arrow">↓</div>
                </div>
            </section>

            {/* Main Action Cards */}
            <section className="welcome-actions">
                <div className="action-card">
                    <div className="action-emoji">🎂</div>
                    <h2>Bake a Cake</h2>
                    <p>Design your dream custom cake. Your flavors, your colors, your vision.</p>
                    <Link to="/bakeacake" className="btn-outline-sweet">Let's Start</Link>
                </div>
                <div className="action-card">
                    <div className="action-emoji">🍰</div>
                    <h2>View Menu</h2>
                    <p>Browse our freshly baked daily treats, pastries, cookies and more.</p>
                    <Link to="/desserts" className="btn-outline-sweet">See Menu</Link>
                </div>
            </section>

            {/* Why Us */}
            <section className="welcome-why">
                <h2>Why SweetCraft? 🍬</h2>
                <div className="why-cards">
                    <div className="why-card">
                        <div className="why-card-emoji">🌸</div>
                        <h3>Fresh Daily</h3>
                        <p>Everything is baked fresh every morning with the finest ingredients.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-card-emoji">🎨</div>
                        <h3>Custom Orders</h3>
                        <p>Design your dream cake. Your flavors, your colors, your vision.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-card-emoji">💝</div>
                        <h3>Made with Love</h3>
                        <p>Every treat is crafted with care and a whole lot of sweetness.</p>
                    </div>
                </div>
            </section>

            {/* Featured Treats */}
            <section className="welcome-featured">
                <h2>Our Favourites ✨</h2>
                <div className="featured-cards">
                    <div className="featured-card">
                        <div className="featured-card-emoji">🎂</div>
                        <h3>Custom Cake</h3>
                        <p>From RM 85</p>
                    </div>
                    <div className="featured-card">
                        <div className="featured-card-emoji">🧁</div>
                        <h3>Cupcakes</h3>
                        <p>From RM 6</p>
                    </div>
                    <div className="featured-card">
                        <div className="featured-card-emoji">🍪</div>
                        <h3>Cookies</h3>
                        <p>From RM 3</p>
                    </div>
                    <div className="featured-card">
                        <div className="featured-card-emoji">🍰</div>
                        <h3>Slice Cakes</h3>
                        <p>From RM 12</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="welcome-footer">
                <p>🎀 Sweet Craft Bakery. Baked with Love 🎀</p>
                <br></br>
                <p style={{ marginTop: '0.5rem' }}>
                    <Link to="/desserts">Menu</Link>
                    <Link to="/bakeacake">Bake a Cake</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                </p>
            </footer>
        </>
    );
}

export default Welcome;