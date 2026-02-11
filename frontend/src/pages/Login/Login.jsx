import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    // 1. Configuration - Replace with your Render URL
    const API_BASE_URL = "https://elite-sponsership.onrender.com";

    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Updated to point to Render
            const res = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
            const user = res.data;

            // Storing session data
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('userId', user.id);

            // Redirecting based on Cloud database response
            if (user.role === 'STUDENT') {
                navigate('/Student-home');
            } else {
                navigate('/Company-home');
            }
        } catch (err) {
            console.error(err);
            alert("Login failed. Please check your credentials or backend status.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <form className="login-card" onSubmit={handleLogin}>
                <h2>Welcome Back</h2>
                <p className="login-subtitle">Log in to manage your sponsorships</p>
                
                <input 
                    type="email" 
                    placeholder="Email" 
                    required 
                    disabled={loading}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} 
                />
                
                <input 
                    type="password" 
                    placeholder="Password" 
                    required 
                    disabled={loading}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} 
                />
                
                <button type="submit" disabled={loading}>
                    {loading ? "Verifying..." : "Login"}
                </button>
                
                {loading && <p className="loading-text">Waking up the server, please wait...</p>}
            </form>
        </div>
    );
};

export default Login;