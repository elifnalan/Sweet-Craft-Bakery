import React, { useState } from 'react';
import '../styles/Auth.css';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            return 'All fields are required.';
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            return 'Please enter a valid email.';
        }
        if (formData.password.length < 8) {
            return 'Password must be at least 8 characters.';
        }
        if (formData.password !== formData.confirmPassword) {
            return 'Passwords do not match.';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await fetch('http://localhost:50000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Registration failed.');
            } else {
                setSuccess('Registration successful! You can now log in. 🎉');
            }
        } catch (err) {
            setError('Could not connect to server. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-emoji">🎂</div>
                <h2 className="auth-title">Join SweetCraft</h2>
                <p className="auth-subtitle">Create your account and start ordering!</p>

                {error && <div className="alert alert-danger rounded-3">{error}</div>}
                {success && <div className="alert alert-success rounded-3">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label className="auth-label">Username</label>
                        <input className="auth-input" type="text" name="username"
                            value={formData.username} onChange={handleChange}
                            placeholder="e.g. sweetlover123" />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Email</label>
                        <input className="auth-input" type="email" name="email"
                            value={formData.email} onChange={handleChange}
                            placeholder="you@email.com" />
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Password</label>
                        <div className="input-group-btn">
                            <input className="auth-input" type={showPassword ? 'text' : 'password'}
                                name="password" value={formData.password} onChange={handleChange}
                                placeholder="Min. 8 characters" />
                            <button type="button" className="toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                    </div>

                    <div className="auth-field">
                        <label className="auth-label">Confirm Password</label>
                        <input className="auth-input" type={showPassword ? 'text' : 'password'}
                            name="confirmPassword" value={formData.confirmPassword}
                            onChange={handleChange} placeholder="Repeat your password" />
                    </div>

                    <button type="submit" className="auth-btn">Create Account 🍰</button>
                </form>

                <p className="auth-footer">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
        </div>
    );
}

export default Register;