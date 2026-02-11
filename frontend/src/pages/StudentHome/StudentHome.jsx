import React, { useState } from 'react';
import './StudentHome.css';
import { FaHome, FaBell, FaPlusCircle, FaTrophy, FaUserCircle } from 'react-icons/fa';
// 1. Make sure to import your ProjectForm!
import ProjectForm from './ProjectForm'; 

const StudentHome = () => {
    const [showPostOptions, setShowPostOptions] = useState(false);
    const [showProjectForm, setShowProjectForm] = useState(false); // 2. This controls the form visibility

    return (
        <div className="student-container">
            <nav className="top-nav">
                <div className="nav-icon active"><FaHome /></div>
                <div className="nav-icon"><FaBell /></div>
                
                {/* 3. The Plus button toggles the small menu */}
                <div className="nav-icon plus-btn" onClick={() => setShowPostOptions(!showPostOptions)}>
                    <FaPlusCircle />
                </div>
                
                <div className="nav-icon"><FaTrophy /></div>
                <div className="nav-icon"><FaUserCircle /></div>
            </nav>

            {/* --- PLUS MENU OPTIONS --- */}
            {showPostOptions && (
                <div className="post-modal">
                    <button className="option-btn">📝 Normal Post</button>
                    {/* 4. This button opens the actual project form */}
                    <button className="option-btn project-btn" onClick={() => {
                        setShowProjectForm(true);
                        setShowPostOptions(false); // Close the small menu
                    }}>
                        🚀 Submit Project (For Companies)
                    </button>
                </div>
            )}

            {/* --- THE PROJECT FORM --- */}
            {/* 5. Only show the form if showProjectForm is true */}
            {showProjectForm && <ProjectForm closeForm={() => setShowProjectForm(false)} />}

            <main className="feed">
                <h2>Your Feed</h2>
                <p>Welcome to the Titan Network!</p>
                {/* Feed content here */}
            </main>
        </div>
    );
};

export default StudentHome;