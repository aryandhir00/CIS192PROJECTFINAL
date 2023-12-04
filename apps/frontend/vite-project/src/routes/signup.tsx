import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://localhost:3000/account/signup', {
        username,
        password
      }, {withCredentials: true});
      console.log('Signup successful:', response.data);
      navigate('/');
    } catch (error) {
      alert("Sign Up error");
      console.error('Unable to sign up');
    }
  };
  return (
    <div className="SignUp">
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
    <button type="submit" onClick={handleSignUp}>Sign Up</button> 
    <p className="post-text">Already have an account?  </p>
    <Link to="/login">Log in here!</Link>

    </div>
  );

}


export default SignUp;