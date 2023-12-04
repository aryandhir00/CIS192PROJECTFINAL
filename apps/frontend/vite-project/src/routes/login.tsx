import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/account/login', {
        username,
        password
      }, {withCredentials: true});
      console.log('Login successful:', response.data);
      console.log(username)
      navigate('/');
    } catch (error) {
      alert("Log In error");
      console.error('Unable to login in');
    }
  };
  return (
    <div className="Login">
      <h1>Personal Budget Tracker</h1>
      <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
      />
      <input
          type="text"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
      />
    <button type="submit" onClick={handleLogin}>Log In</button>
    <p className="post-text">Don't have an account?  </p>
    <Link to="/signup">Sign up here!</Link>

    </div>
  );

}


export default Login;