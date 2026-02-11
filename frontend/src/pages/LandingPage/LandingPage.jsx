import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <nav className="navbar">
                <div className="logo">ELITE<span>TITANS</span></div>
                <div className="nav-links">
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <button className="nav-btn" onClick={() => navigate('/login')}>Login / Register</button>
                </div>
            </nav>

            <header className="hero-section">
                <h1>Where Talent Meets <span>Sponsorship</span></h1>
                <p>The elite platform for students to showcase projects via reels and get sponsored by top companies.</p>
                <div className="hero-btns">
                    <button className="cta-btn primary" onClick={() => navigate('/register')}>Get Started</button>
                    <button className="cta-btn secondary">Watch Demo</button>
                </div>
            </header>

            <section id="about" className="info-section">
                <h2>About Us</h2>
                <p>We bridge the gap between innovation and investment using short-form video storytelling.</p>
            </section>

            <footer className="footer">
                <p>&copy; 2026 Elite Merit Sponsership. All Rights Reserved.</p>
                <p>Contact: support@elitetitans.com</p>
            </footer>
        </div>
    );
};

export default LandingPage;