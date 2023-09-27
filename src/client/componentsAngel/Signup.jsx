import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./SignUp.css";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [popupStyle, showPopup] = useState("hide");

  const popup = () => {
    showPopup("loginPopup")
    setTimeout(() => showPopup("hide"), 3000)
  }

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signup = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            }, 
            body: JSON.stringify({
                username,
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
        return result;
      } catch (error) {
        console.log(error);
        setError(error);
      }
      navigate('/login');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <>
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
        <button className='loginButton' onClick={popup}>Login</button>
        <div className={popupStyle}>
          <h3>Login Failed</h3>
          <p>Username or Password are incorrect</p>
        </div>
      </form>
    </div>
    </>
  );
}

export default SignUp;
