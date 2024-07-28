import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css";

const StudentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:10000/login", { email, password })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token); // Save token in local storage
          alert("Login successful!");
          navigate("/Home"); // Redirect to the HomePage
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setError("An error occurred during login. Please try again.");
      });
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"}
        </button>

        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/student-register">Register</Link>
      </p>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default StudentLogin;
