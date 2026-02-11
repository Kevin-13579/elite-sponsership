import React,{useState} from 'react';
import axios from 'axios';
import './Register.css';
const Register=()=>{
    const[user,setUser]=useState({
        name:'',
        email:'',
        password:'',
        role:'STUDENT',
        isVerified:false
    })

    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('http://localhost:8080/api/auth/register',user);
            alert("Success: "+response.data);
        }
        catch(error){
            console.error(error);
            alert("Registration failed.Check if backend is running!");
        }
    };

    return(
        <div className="register-page">
            <div className="register-car">
                <h2>Join Devops Titans</h2>
                <p>Bridge the gap between Merit and Industry</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="full name:" onChange={handleChange} required/>
                    <input type="email" name="email" placeholder="Email address" onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="password" onChange={handleChange} required/>

                    <label>I am a:</label>
                        <select name='role' onChange={handleChange}>
                            <option value="STUDENT">Student(seeker)</option>
                            <option value="COMPANY">Company(Sponser)</option>
                        </select>
                    <button type="submit">create Account</button>
                </form>
            </div>
        </div>
    );
};
export default Register;