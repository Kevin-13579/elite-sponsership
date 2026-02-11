import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHome, FaHeart, FaPlayCircle, FaCommentDots, FaUserTie, FaSearch, FaPaperPlane } from 'react-icons/fa';
import './CompanyDashboard.css';

const CompanyDashboard = () => {
    // 1. Configuration - REPLACE THIS with your actual Render URL
    const API_BASE_URL = "https://elite-sponsership.onrender.com"; 

    // 2. State Management
    const [view, setView] = useState('home'); 
    const [projects, setProjects] = useState([]); 
    const [filteredProjects, setFilteredProjects] = useState([]); 
    const [searchFilters, setSearchFilters] = useState({ budget: '', location: 'Tamil Nadu' });
    
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const companyId = localStorage.getItem('userId');

    // 3. Fetch Projects on Load
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/api/projects/all`);
                setProjects(res.data);
                setFilteredProjects(res.data);
            } catch (err) {
                console.error("Error fetching projects", err);
            }
        };
        fetchProjects();
    }, [API_BASE_URL]);

    // 4. Fetch Chat History
    const fetchChatHistory = async (studentId) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/messages/history/${companyId}/${studentId}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Could not load chat", err);
        }
    };

    // 5. Search Functionality
    const handleSearch = () => {
        const results = projects.filter(p => {
            const matchesBudget = searchFilters.budget === '' ? true : p.expectedFunds <= parseFloat(searchFilters.budget);
            return matchesBudget;
        });
        setFilteredProjects(results);
    };

    // 6. Investment Logic
    const handleInvest = async (project) => {
        const proposal = {
            senderId: companyId,
            receiverId: project.studentId,
            content: `INTERESTED: We have viewed your pitch for "${project.title}" and are ready to invest. Let's discuss the terms.`
        };

        try {
            await axios.post(`${API_BASE_URL}/api/messages/send`, proposal);
            alert("Investment proposal sent successfully!");
            await fetchChatHistory(project.studentId);
            setView('messages'); 
        } catch (err) {
            alert("Failed to send proposal. Check backend.");
        }
    };

    // 7. Send New Message Logic
    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        
        // Use the studentId from the last message received to reply
        const lastMsg = messages[messages.length - 1];
        const receiverId = lastMsg?.senderId === companyId ? lastMsg.receiverId : lastMsg?.senderId;

        try {
            const res = await axios.post(`${API_BASE_URL}/api/messages/send`, {
                senderId: companyId,
                receiverId: receiverId,
                content: newMessage
            });
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.error("Failed to send message");
        }
    };

    return (
        <div className="company-container">
            {/* --- TOP SEARCH BAR --- */}
            {(view === 'home' || view === 'reels') && (
                <div className="search-header">
                    <div className="search-box">
                        <input 
                            type="number" 
                            placeholder="Max Budget (₹)" 
                            onChange={(e) => setSearchFilters({...searchFilters, budget: e.target.value})}
                        />
                        <select onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Others">Others</option>
                        </select>
                        <button className="search-icon-btn" onClick={handleSearch}>
                            <FaSearch />
                        </button>
                    </div>
                </div>
            )}

            {/* --- MAIN CONTENT AREA --- */}
            <main className="content-area">
                
                {view === 'home' && (
                    <div className="brief-feed">
                        {filteredProjects.map(p => (
                            <div key={p.id} className="brief-card">
                                <div className="card-header">
                                    <h3>{p.title}</h3>
                                    <span className="budget-tag">₹{p.expectedFunds}</span>
                                </div>
                                <p>{p.description?.substring(0, 120)}...</p>
                                <div className="card-footer">
                                    <span className="tech">{p.techStack}</span>
                                    <button onClick={() => setView('reels')}>Watch Pitch</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {view === 'reels' && (
                    <div className="reels-vertical">
                        {filteredProjects.map(p => (
                            <div key={p.id} className="reel-segment">
                                {/* CLOUDINARY CHANGE: Just use p.videoPath directly */}
                                <video src={p.videoPath} controls />
                                <div className="reel-info-overlay">
                                    <h2>{p.title}</h2>
                                    <p>Tech: {p.techStack}</p>
                                    <button className="invest-btn" onClick={() => handleInvest(p)}>
                                        READY TO INVEST
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {view === 'messages' && (
                    <div className="messages-container">
                        <div className="chat-window">
                            <div className="chat-header">Direct Pitch Conversation</div>
                            <div className="chat-messages">
                                {messages.length === 0 ? (
                                    <div className="msg system">No conversation selected.</div>
                                ) : (
                                    messages.map((m) => (
                                        <div key={m.id} className={`msg ${m.senderId == companyId ? 'sent' : 'received'}`}>
                                            {m.content}
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="chat-input-area">
                                <input 
                                    type="text" 
                                    placeholder="Type a message..." 
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <button onClick={sendMessage}>
                                    <FaPaperPlane />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'profile' && (
                    <div className="company-profile">
                        <div className="profile-header">
                            <FaUserTie className="big-avatar" />
                            <h2>Company Dashboard</h2>
                        </div>
                        <div className="stats-grid">
                            <div className="stat-card"><h4>12</h4><p>Investments</p></div>
                            <div className="stat-card"><h4>45</h4><p>Hired</p></div>
                            <div className="stat-card"><h4>₹15L</h4><p>Deployed</p></div>
                        </div>
                    </div>
                )}
            </main>

            {/* --- BOTTOM NAVBAR --- */}
            <nav className="bottom-nav">
                <div className={`nav-item ${view === 'home' ? 'active' : ''}`} onClick={() => setView('home')}>
                    <FaHome /><p>Home</p>
                </div>
                <div className={`nav-item ${view === 'wishlist' ? 'active' : ''}`} onClick={() => setView('wishlist')}>
                    <FaHeart /><p>Wishlist</p>
                </div>
                <div className={`nav-item ${view === 'reels' ? 'active' : ''}`} onClick={() => setView('reels')}>
                    <FaPlayCircle className="reels-icon-main" /><p>Reels</p>
                </div>
                <div className={`nav-item ${view === 'messages' ? 'active' : ''}`} onClick={() => setView('messages')}>
                    <FaCommentDots /><p>Chat</p>
                </div>
                <div className={`nav-item ${view === 'profile' ? 'active' : ''}`} onClick={() => setView('profile')}>
                    <FaUserTie /><p>Profile</p>
                </div>
            </nav>
        </div>
    );
};

export default CompanyDashboard;