import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

    }, []);

    useEffect(() => {

        const getProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "http://localhost:5000/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                console.log(response.data);

            } catch (error) {

                console.log(error.response?.data || error.message);

            }

        };

        getProfile();

    }, []);

    useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/");
        return;
    }

}, [navigate]);

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (
        <div className="home-container">

            <h2>Welcome to Lestaz Tech</h2>

            <p>{user?.email}</p>

            <p>Successful login</p>

            <button onClick={handleLogout}>
                Log out
            </button>

        </div>
    );

};

export default Home;