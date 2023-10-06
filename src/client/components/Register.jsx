import { useState } from 'react'
import { registerUser } from '../API/ajaxHelpers'
import { useNavigate } from 'react-router-dom'

export default function RegisterForm({ setLoggedIn, setUser }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError({message: "Passwords aren't identical"});
        }

        try {
            const token = await registerUser(username, password);
            setLoggedIn(token);
            setUser(token);
        } catch (error) {
            setError(error);
        }
        navigate('/websites');
    }
        

    return (
        <div className="register-user">
            <h1 className='register-header'>Register!</h1>
            <form className="register-form" onSubmit={handleSubmit}>
            <label className='register-label'>
                    Name: {' '}
                    <input
                    className='register-input'
                    type="text"
                    name="name"
                    placeholder="Name"
                    required={true}
                    minLength={2}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className='register-label'>
                    Username: {' '}
                    <input
                    className='register-input'
                    type="text"
                    name="username"
                    placeholder="Username"
                    required={true}
                    minLength={3}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label className='register-label'>
                    Password: {' '}
                    <input
                    className='register-input'
                    type="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    minLength={7}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <label className='register-label'>
                    Confirm Password: {' '}
                    <input
                    className='register-input'
                    type="password"
                    name="password"
                    placeholder="Password"
                    required={true}
                    minLength={7}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </label>
                <button className="register-button">Register</button>
            </form>
        </div>
    )
}