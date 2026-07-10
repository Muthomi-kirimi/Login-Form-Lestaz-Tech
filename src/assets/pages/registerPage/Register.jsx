import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import { useNavigate } from "react-router-dom";


const Register = () => {
   
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });

  };

  const validate = () => {

    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm your password";
    } else if (
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match";
    }

    return newErrors;

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    navigate("/");
    alert("Registration Successful");

    console.log(formData);

    setFormData({
      email: "",
      password: "",
      confirmPassword: ""
    });

  };

  return (

    <div className="register-container">

      <form className="register-card" onSubmit={handleSubmit}>

        <h2>Create Account</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        {errors.email && (
          <span className="error">{errors.email}</span>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />

        {errors.password && (
          <span className="error">{errors.password}</span>
        )}

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {errors.confirmPassword && (
          <span className="error">
            {errors.confirmPassword}
          </span>
        )}

        <button type="submit">
          Register
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>

      </form>

    </div>

  );
};

export default Register;