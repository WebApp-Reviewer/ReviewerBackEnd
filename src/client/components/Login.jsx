import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./login.css";

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = async() => {
    try {
        const response = await fetch('http://localhost:5432/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                email,
                password
            })
        });
        const result = await response.json();
        setMessage(result.message);
        if(!response.ok) {
          throw(result)
        }
        setUsername('');
        setPassword('');
    } catch (err) {
        console.error(`${err.name}: ${err.message}`);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate('/reviews');
  };

  return (
    <div className='login'>
      <h1 className='header'>Sign in</h1>
      <form className='loginBox' onSubmit={handleSubmit}>
        <label className='loginInfo'>
          Username:{''}
          <input
            className='loginBar'
            type='text'
            name='username'
            placeholder='Username'
            required={true}
            minLength={5}
            value={username}
            onChange={handleUsernameChange}
          />
        </label>
        <label className='loginInfo'>
          Password:{''}
          <input
            className='loginBar'
            type='password'
            name='password'
            placeholder='Password'
            required={true}
            minLength={5}
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <Link className='register' to='/register'>
          Don't have an account, make it here.
        </Link>
        <button className='loginButton'>Login</button>
      </form>
    </div>
  );
}

export default LogIn;
