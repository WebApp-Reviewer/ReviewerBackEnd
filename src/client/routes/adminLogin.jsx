// import { useState } from "react";
// import { adminLogin } from "../ajaxHelper";
// import { useOutletContext, Link } from "react-router-dom";

// const AdminLogin = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [secretkey, setSecretKey] = useState('');
//     const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useOutletContext();

//     async function submitAdmin(e) {
//         e.preventDefault();
//         const user = {
//             user: {
//                 username,
//                 password,
//                 secretkey
//             }
//         };
//         const response = await adminLogin(user);

//         if (response.error) {
//             setPasswordErrorMessage("Username, password or secretkey are incorrect. Please try again");
//         } else {
//             localStorage.setItem('token', response.data.token);
//             setIsLoggedIn(true);
//         }
//     }

//     return (
//         <div className="panel">
//             {isLoggedIn ? (
//                 <h1>Welcome Back!</h1>
//             ) : (
//                 <>
//                     <h1>Admin Log In</h1>
//                     <form onSubmit={submitAdmin}>
//                         <input
//                             type="text"
//                             value={username}
//                             placeholder="Username"
//                             onChange={(e) => setUsername(e.target.value)}
//                         />
//                         <input
//                             type="password"
//                             value={password}
//                             placeholder="Password"
//                             onChange={(e) => {
//                                 setPassword(e.target.value);
//                                 setPasswordErrorMessage('');
//                             }}
//                         />
//                         <input
//                             type="text"
//                             value={secretkey}
//                             placeholder="Secret Key"
//                             onChange={(e) => {
//                                 setSecretKey(e.target.value);
//                                 setSecretKeyErrorMessage('');
//                             }}
//                         />
//                         {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
//                         <button type="submit" className="submitButton">Log In</button>
//                     </form>
//                     <Link to="/Login" className="adminLink">Click here to return to login</Link>
//                 </>
//             )}
//         </div>
//     );
// };

// export default AdminLogin;

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { adminLogin } from '../ajaxHelper';
import '../Style/Login.css'

export default function AdminLogin({ setLoggedIn, setUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secret, setSecret] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
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
                {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                <button type="submit" className="submitButton">Log In</button>
            </form>
            <Link to="/Login" className="adminLink">Click here to return to login</Link>
        </div>
    )
}