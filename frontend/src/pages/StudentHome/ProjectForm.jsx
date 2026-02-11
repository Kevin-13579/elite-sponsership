import React, { useState } from 'react';
import axios from 'axios';
import './ProjectForm.css';

const ProjectForm = ({ closeForm }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        expectedFunds: '', // New field
    });
    const [video, setVideo] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [verifyPdf, setVerifyPdf] = useState(null); // New verification file

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('techStack', formData.techStack);
        data.append('expectedFunds', formData.expectedFunds); // Matches @RequestParam
        data.append('video', video);
        data.append('pdf', pdf);
        data.append('verifyPdf', verifyPdf); // Matches @RequestParam
        data.append('studentId', localStorage.getItem('userId'));

        try {
            // Added timeout and progress tracking could go here for big videos
            await axios.post('http://localhost:8080/api/projects/upload', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert("Project Uploaded & Verification Mail Stored Successfully!");
            closeForm();
        } catch (err) {
            console.error(err);
            alert("Upload failed. Make sure files are under 50MB and backend is running.");
        }
    };

    return (
        <div className="form-overlay">
            <div className="form-card">
                <button className="close-btn" onClick={closeForm}>&times;</button>
                <h3>🚀 Submit Your Project</h3>
                <p className="form-subtitle">Fill in the details to attract investors</p>
                
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Project Title" required 
                        onChange={(e) => setFormData({...formData, title: e.target.value})} />
                    
                    <textarea placeholder="Describe your project (Brief for the post)..." required 
                        onChange={(e) => setFormData({...formData, description: e.target.value})} />

                    <div className="form-row">
                        <input type="text" placeholder="Tech Stack (Java, React, etc.)" 
                            onChange={(e) => setFormData({...formData, techStack: e.target.value})} />
                        
                        <input type="number" placeholder="Expected Fund (₹)" required
                            onChange={(e) => setFormData({...formData, expectedFunds: e.target.value})} />
                    </div>

                    <div className="file-section">
                        <div className="file-input">
                            <label>🎥 Pitch Video (Max 3-min MP4)</label>
                            <input type="file" accept="video/mp4" 
                                onChange={(e) => setVideo(e.target.files[0])} required />
                        </div>

                        <div className="file-input">
                            <label>📄 Project Report (PDF)</label>
                            <input type="file" accept="application/pdf" 
                                onChange={(e) => setPdf(e.target.files[0])} required />
                        </div>

                        <div className="file-input highlight">
                            <label>📧 Verification Email/Certificate (PDF)</label>
                            <input type="file" accept="application/pdf" 
                                onChange={(e) => setVerifyPdf(e.target.files[0])} required />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Publish to Investor Feed</button>
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;