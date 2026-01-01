import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate, } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Register() {
    let initialize = { name: "", email: "", password: "" ,fav:[],cart:[]}; 
    const navigate = useNavigate();
    const [value, setvalue] = useState(initialize);
    const [error, seterror] = useState({});

    const handleChange = (e) => {
        setvalue({ ...value, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const err = {};
        if (!value.name.trim()) { err.name = "Name required" }
        if (!value.email.trim()) { err.email = "Email required" } else if (!value.email.includes("@")) { err.email = "Incorrect Format" }
        if (!value.password.trim()) { err.password = "password required" } else if (value.password.length < 8) { err.password = "Must atleast 8 characters" }
        seterror(err);

        if (Object.keys(err).length === 0) {
            try {
               const res = await axios.post("http://localhost:5000/api/auth/register", {
  name: value.name,
  email: value.email,
  password: value.password,
});

const { token, user } = res.data;

// store auth info
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));

toast.success("Registration Successful");

// optional: auto-login
navigate("/");
console.log(res.data);

                }
catch (error) {
                console.error("Registration failed:", error);
            }
        }
    };

    return (
        <>
            <div className='login-container ' style={{ textAlign: "center" }}>
                <form onSubmit={handleSubmit}>
                    <h1>Registration Page</h1>
                    <input type="text" placeholder="Enter name" name='name' value={value.name} onChange={handleChange} />{error.name && <p style={{ color: "red" }}>{error.name}</p>}<br /><br />
                    <input type="email" placeholder="Enter email" name='email' value={value.email} onChange={handleChange} />{error.email && <p style={{ color: "red" }}>{error.email}</p>}<br /><br />
                    <input type="password" placeholder="Enter password" name='password' value={value.password} onChange={handleChange} />{error.password && <p style={{ color: "red" }}>{error.password}</p>}<br /><br />
                    <button type="submit">Register</button>
                    <Link to="/login" style={{ color: "#00a86b", fontWeight: "bold" }}>Back to login</Link>

                </form>
            </div>
        </>
    );
}