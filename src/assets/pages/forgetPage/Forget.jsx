import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./forget.css"


const Forget =  () => {

  const API_URL=import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

   //console.log("API_URL =", API_URL);
   //console.log(import.meta.env);

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }

 try{
      const response= await axios.post(
        `${API_URL}/api/auth/forget`,
        {
          email
        }
      );
   
      alert(response.data.message );

      //navigate("/ResetPassword");

    } catch (error) {
      alert(
        error.response?.data?.message || "Unable to send reset link"
      )
    }


    setError("");

    setEmail("");
  };

  return (
    <div className="forgot-container">
      <form className="forgot-card" onSubmit={handleSubmit}>

        <h2>Forgot Password</h2>

        <p>
          Enter your email address for a reset link.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />

        {error && <span className="error">{error}</span>}

        <button type="submit">
          Send Reset Link
        </button>

        <Link to="/">
          Back to Login
        </Link>

      </form>
    </div>
  );
};

export default Forget;