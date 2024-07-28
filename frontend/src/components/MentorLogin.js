// src/components/MentorLogin.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MentorContext } from '../MentorContext'; // Ensure this is correctly imported

const MentorLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { setMentor } = useContext(MentorContext);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock authentication process
        const mentor = { username, id: 1 }; // Replace with actual API call
        setMentor(mentor);
        navigate('/course-mentor');
    };

    return (
        <div>
            <h2>Mentor Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "Hide" : "Show"}
                  </button>
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/mentor-register">Register</Link></p>
        </div>
    );
};

export default MentorLogin;
