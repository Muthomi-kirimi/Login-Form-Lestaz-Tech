import React from 'react'
import { useState } from 'react';
import "./login.css";
import { Link,useNavigate } from  "react-router-dom" ;
import axios from 'axios';


const Login =  () => {

  const API_URL=import.meta.env.VITE_API_URL;
    const navigate=useNavigate();
    const [formData, setFormData]= useState({
        email: "",
        password: "",
    });
    const [errors, setErrors]=useState({});
    const handleChange=(e) =>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    const validate =()=>{
        const newErrors={};

        if(!formData.email.trim()){
            newErrors.email="Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {
            newErrors.email="Enter a valid email";
            
        }


        if(!formData.password) {
            newErrors.password="Password is required";
        } else if (formData.password.length < 6){
            newErrors.password="Password must be at least 6 characters";
        }
        return newErrors;
    };

    const handleSubmit= async (e) =>{
        e.preventDefault();
        
        const validationErrors=validate();

         if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try{
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      //To save JQWT Token
      localStorage.setItem("token", response.data.token);

      //To save user Info
      localStorage.setItem("user", 
        JSON.stringify(response.data.user)
      );
      
      navigate("/home");

    } catch (error) {

      alert(error.response?.data?.message || "Login Failed");
      
    }
        
      console.error(e);
  
      setFormData({
      email: "",
      password: "",
    });

    };

  return (

     <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
           
        <h2>Login to Lestaz Tech</h2>

        <div className="input-group">
          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <span className="error">{errors.email}</span>
          )}
        </div>

        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          {errors.password && (
            <span className="error">{errors.password}</span>
          )}
        </div>

        <button type="submit">
          Login
        </button>


<div className="login-links">

    <Link to="/forget" className="forgot-link">
        Forgot Password?
    </Link>

    <p className='regiter-section'>
        Don't have an account?
        <Link to="/register" className="register-link">
            Register
        </Link>
    </p>

     </div>

      </form>
    </div>
  );
};

export default Login
