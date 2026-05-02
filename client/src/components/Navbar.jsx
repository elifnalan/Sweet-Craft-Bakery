import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.png';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

function Navbar() {
    const { cart } = useCart();
    const { user, logout } = useUser();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className='navbar'>
            <div className='logo'>
                <img src={logo} alt='logo' className='logo-icon' />
                <h1 className='logo-text'>Sweet Craft Bakery</h1>
            </div>
            <ul className='nav-links'>
                <li><Link to='/'> Home </Link></li>
                <li><Link to='/bakeacake'> Bake a Cake </Link></li>
                <li><Link to='/desserts'> Desserts </Link></li>
                <li>
                    <Link to='/cart' className='cart-link'>
                        🛒
                        {cartCount > 0 && (
                            <span className='cart-badge'>{cartCount}</span>
                        )}
                    </Link>
                </li>
                {user ? (
                    <>
                        <li><span className='nav-username'>Hi, {user.name}! 👋</span></li>
                        <li><button className='nav-logout-btn' onClick={logout}>Logout</button></li>
                    </>
                ) : (
                    <li><Link to='/login'> Login </Link></li>
                )}
            </ul>
        </nav>
    )
}

export default Navbar;