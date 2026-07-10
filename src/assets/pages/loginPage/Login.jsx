import React from 'react'
import { useState } from 'react';
import "./login.css";
import { Link,useNavigate } from  "react-router-dom" ;



const Login = () => {
      
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
        } else if (formData.password.length < 8){
            newErrors.password="Password must be at least 8 characters";
        }
        return newErrors;
    };

    const handleSubmit=(e) =>{
        e.preventDefault();
        
        const validationErrors=validate();

         if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    navigate("/home");

    console.log(formData);

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
