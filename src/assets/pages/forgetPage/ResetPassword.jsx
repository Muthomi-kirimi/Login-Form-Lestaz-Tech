import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {

     const API_URL=import.meta.env.VITE_API_URL;

    const { token } = useParams();

    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        try {

            const response = await axios.post(

                `${API_URL}/api/auth/reset-password/${token}`,

                {
                    password,
                }

            );

            alert(response.data.message);

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to reset password."
            );

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Reset Password</h2>

            <input

                type="password"

                placeholder="New Password"

                value={password}

                onChange={(e) =>
                    setPassword(e.target.value)
                }

            />

            <input

                type="password"

                placeholder="Confirm Password"

                value={confirmPassword}

                onChange={(e) =>
                    setConfirmPassword(e.target.value)
                }

            />

            <button type="submit">

                Reset Password

            </button>

        </form>

    );

};

export default ResetPassword;