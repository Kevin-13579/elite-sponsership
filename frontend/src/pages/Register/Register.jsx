import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    // 1. Configuration - Use your Render URL
    const API_BASE_URL = "https://elite-sponsership.onrender.com";

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        role: 'STUDENT',
        isVerified: false
    });

    // Loading state to prevent multiple clicks
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Pointing to Render instead of localhost
            const response = await axios.post(`${API_BASE_URL}/api/auth/register`, user);
            alert("Success: " + response.data);
            
            // Optional: Redirect to login after success
            // window.location.href = "/login"; 
        }
        catch (error) {
            console.error(error);
            alert("Registration failed. Please check your internet or try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-card"> {/* Fixed typo from 'register-car' */}
                <h2>Join Devops Titans</h2>
                <p>Bridge the gap between Merit and Industry</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Full Name" 
                        onChange={handleChange} 
                        disabled={loading}
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        onChange={handleChange} 
                        disabled={loading}
                        required 
                    />
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange} 
                        disabled={loading}
                        required 
                    />

                    <label>I am a:</label>
                    <select name='role' onChange={handleChange} disabled={loading}>
                        <option value="STUDENT">Student (Seeker)</option>
                        <option value="COMPANY">Company (Sponsor)</option>
                    </select>
                    
                    <button type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;