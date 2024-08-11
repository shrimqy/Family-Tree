import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Fetch the environment variables
  const adminUsername = process.env.REACT_APP_USERNAME_ADMIN;
  const adminPassword = process.env.REACT_APP_PASSWORD_ADMIN;
  const userUsername = process.env.REACT_APP_USERNAME_USER;
  const userPassword = process.env.REACT_APP_PASSWORD_USER;

  const handleLogin = () => {
    // Use the environment variables for authentication
    if (username === adminUsername && password === adminPassword) {
      login('admin1');  // Set role as admin
      navigate('/admin');
    } else if (username === userUsername && password === userPassword) {
      login('user');  // Set role as user
      navigate('/homepage');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
};

export default LoginPage;
