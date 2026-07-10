import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forget.css"


const Forget = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex =
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }

    setError("");

    alert(
      "Password reset link sent to your email"
    );

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