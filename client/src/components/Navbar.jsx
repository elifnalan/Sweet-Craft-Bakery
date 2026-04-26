import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/logo.png'; // ← add this

function Navbar() { 
    return(
        <nav className='navbar'>

           <div className='logo'>
            <img src={logo} alt='logo' className='logo-icon' />
            <h1 className='logo-text'>Sweet Craft Bakery</h1>
            </div>
            
            <ul className='nav-links'>  
                <li><Link to='/'> Home </Link></li>
                <li><Link to='/bakeacake'> Bake a Cake </Link></li>
                <li><Link to='/desserts'> Desserts </Link></li>
                <li><Link to='/cart'> Cart </Link></li>
                <li><Link to='/login'> Login </Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;