import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../API/ajaxHelpers'

export default function LogInForm({ setLoggedIn, setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('handle submit');

        try {
            const token = await adminLogin(username, password, secret);
            setLoggedIn(token);
            setUser(token);
            console.log("token", token);
        } catch (error) {
            console.log(error);
        }
        navigate('/websites')
    }

    return (
        <div className="login-user">
            <h1 className='login-header'>Login!</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label className='login-label'>
                    Username: {' '}
                    <input
                    className='login-input'
                    type="text"
                    name="username"
                    placeholder="Username"
                    required={true}
                    minLength={3}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className='login-label'>
                    Password: {' '}
                    <input
                    className='login-input'
                    type="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    minLength={7}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label className='login-label'>
                    Secret Key: {' '}
                    <input
                    className='login-input'
                    type="password"
                    name="password"
                    placeholder="Secret Key"
                    required={true}
                    minLength={7}
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    />
                </label>
                <button className="login-button">Login</button>
            </form>
        </div>
    )
}