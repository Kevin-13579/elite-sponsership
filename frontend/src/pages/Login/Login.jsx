import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Login.css';
const Login=()=>{
    const[credentials,setCredentials]=useState({email:'',password:''});
    const navigate=useNavigate();
    const handleLogin=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://localhost:8080/api/auth/login", credentials);
                const user=res.data;
                localStorage.setItem('userRole',user.role);
                localStorage.setItem('userId',user.id);

                if(user.role==='STUDENT'){
                    navigate('/Student-home');
                }else{
                    navigate('/Company-home');
                }
            }
        catch(err){
                    alert("login failed");
                }
            };
        return(
            <div className="login-page">
                <form className="login-card" onSubmit={handleLogin}>
                    <h2>Welcome Back</h2>
                    <input type="email" placeholder="Email" onChange={(e)=>setCredentials({...credentials,email:e.target.value})}/>
                    <input type="password" placeholder="Password" onChange={(e)=>setCredentials({...credentials,password:e.target.value})}/>
                    <button type="submit">Login</button>
                </form>
            </div>
            
        );
};
export default Login;