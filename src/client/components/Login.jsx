import { useState } from 'react'
import { userLogin } from '../API/ajaxHelpers'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Login({ setLoggedIn, setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log('handle submit');

        const user = {
            username,
            password
        };

        const response = await userLogin(user);

        if(response.error) {
            console.log("Message: ", error);
            setPasswordErrorMessage("Username or password is incorrect.");
        } else {
            localStorage.setItem('token', response.token);
            setLoggedIn(true);
            setUser(true);
        } navigate("/websites");
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
                {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                <Link className="register-link" to="/register">Do Not Have An Account?</Link>
                <Link className='admin-link' to="/admin/login">Sign in as Admin</Link>
                <button className="login-button">Login</button>
            </form>
        </div>
    )
}