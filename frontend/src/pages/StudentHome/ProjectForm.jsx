import React, { useState } from 'react';
import axios from 'axios';
import './ProjectForm.css';

const ProjectForm = ({ closeForm }) => {
    // 1. Configuration - Replace with your Render URL
    const API_BASE_URL = "https://elite-sponsership.onrender.com";

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        expectedFunds: '',
    });
    
    const [video, setVideo] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [verifyPdf, setVerifyPdf] = useState(null);
    
    // 2. Loading State (Crucial for Cloud Uploads)
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true); // Start the spinner
        
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('techStack', formData.techStack);
        data.append('expectedFunds', formData.expectedFunds);
        data.append('video', video);
        data.append('pdf', pdf);
        data.append('verifyPdf', verifyPdf);
        data.append('studentId', localStorage.getItem('userId'));

        try {
            // Updated to your Render URL
            await axios.post(`${API_BASE_URL}/api/projects/upload`, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            alert("Success! Project is now live on the Investor Feed.");
            closeForm();
        } catch (err) {
            console.error(err);
            alert("Upload failed. Ensure files are under 50MB and you have a stable connection.");
        } finally {
            setIsUploading(false); // Stop the spinner
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-card">
                <button className="close-btn" onClick={closeForm} disabled={isUploading}>&times;</button>
                <h3>🚀 Submit Your Project</h3>
                <p className="form-subtitle">Fill in the details to attract investors</p>
                
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Project Title" required 
                        disabled={isUploading}
                        onChange={(e) => setFormData({...formData, title: e.target.value})} />
                    
                    <textarea placeholder="Describe your project (Brief for the post)..." required 
                        disabled={isUploading}
                        onChange={(e) => setFormData({...formData, description: e.target.value})} />

                    <div className="form-row">
                        <input type="text" placeholder="Tech Stack (Java, React, etc.)" 
                            disabled={isUploading}
                            onChange={(e) => setFormData({...formData, techStack: e.target.value})} />
                        
                        <input type="number" placeholder="Expected Fund (₹)" required
                            disabled={isUploading}
                            onChange={(e) => setFormData({...formData, expectedFunds: e.target.value})} />
                    </div>

                    <div className="file-section">
                        <div className="file-input">
                            <label>🎥 Pitch Video (Max 3-min MP4)</label>
                            <input type="file" accept="video/mp4" 
                                disabled={isUploading}
                                onChange={(e) => setVideo(e.target.files[0])} required />
                        </div>

                        <div className="file-input">
                            <label>📄 Project Report (PDF)</label>
                            <input type="file" accept="application/pdf" 
                                disabled={isUploading}
                                onChange={(e) => setPdf(e.target.files[0])} required />
                        </div>

                        <div className="file-input highlight">
                            <label>📧 Verification Email/Certificate (PDF)</label>
                            <input type="file" accept="application/pdf" 
                                disabled={isUploading}
                                onChange={(e) => setVerifyPdf(e.target.files[0])} required />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={isUploading}>
                        {isUploading ? "Uploading to Cloud... Please wait" : "Publish to Investor Feed"}
                    </button>
                    
                    {isUploading && <p className="upload-note">Note: Large videos may take up to a minute to process.</p>}
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;