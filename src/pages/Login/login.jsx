import React, { useState } from "react";
import { Link } from "react-router-dom";
import './login.css';
import { useAuth } from "../Context/authcontext";
import { toast } from "react-toastify";
import axios from "axios";

function App() {
  let initialize = { email: "", password: "" };
  const [values, setValues] = useState(initialize);
  const [error, setError] = useState({});

  const { login } = useAuth();

  let handle = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!values.email.trim()) {
      err.emailid = "Email required";
    } else if (!values.email.includes("@")) {
      err.email = "Incorrect Format";
    }
    if (!values.password.trim()) {
      err.password = "password required";
    } else if (values.password.length < 8) {
      err.password = "Must be at least 8 characters";
    }
    setError(err);

    if (Object.keys(err).length === 0) {
      try {
       const res = await axios.post("http://localhost:5000/api/auth/login", {
  email: values.email,
  password: values.password,
});

const { token, user } = res.data;

// store token + user
localStorage.setItem("token", token);
localStorage.setItem("user", JSON.stringify(user));

toast.success("Login Successful!");
login({ token, user }); 

      } catch (err) {
        console.error("An error occurred during login:", err);
      }
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>Email id <br />
            <input 
              type="text" 
              name="email" 
              placeholder="Enter Email id" 
              value={values.email} 
              onChange={handle} 
            />
            {error.email && <p style={{ color: "red" }}>{error.email}</p>}
          </label>
        </div>
        <div>
          <label>Password <br />
            <input 
              type="password" 
              name="password" 
              placeholder="Enter Password" 
              value={values.password} 
              onChange={handle} 
            />
            {error.password && <p style={{ color: "red" }}>{error.password}</p>}
          </label>
        </div>
        <button type="submit">Submit</button>
        <p style={{ marginTop: "15px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#00a86b", fontWeight: "bold" }}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default App;