import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./AdminLogin.css";

export default function AdminLogIn({ setLoggedIn, setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('handle submit');

    try {
      const token = await loginUser(username, password);
      setLoggedIn(token);
      setUser(token);
      console.log('token', token);
    } catch (error) {
      setError(error);
    }
    navigate('/posts');
  }

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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Link className='login-link' to='/login'>
          Do you want to sign in without Admin?
        </Link>
        <button className='loginButton'>Login</button>
      </form>
    </div>
  );
}
