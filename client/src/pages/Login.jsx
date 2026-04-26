import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!formData.email || !formData.password) {
            return 'All fields are required.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await fetch('http://localhost:50000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Login failed.');
            } else {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/');
            }
        } catch (err) {
            setError('Could not connect to server. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-emoji">🍪</div>
                <h2 className="auth-title">Welcome Back!</h2>
                <p className="auth-subtitle">We missed you — let's get baking!</p>

                {error && <div className="alert alert-danger rounded-3">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input className="auth-input" type="email" name="email"
                            value={formData.email} onChange={handleChange}
                            placeholder="your@email.com" />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <input className="auth-input" type="password" name="password"
                            value={formData.password} onChange={handleChange}
                            placeholder="Your password" />
                    </div>

                    <button type="submit" className="auth-btn">Login 🎀</button>
                </form>

                <p className="auth-footer">
                    Don't have an account? <a href="/register">Register here</a>
                </p>
            </div>
        </div>
    );
}

export default Login;