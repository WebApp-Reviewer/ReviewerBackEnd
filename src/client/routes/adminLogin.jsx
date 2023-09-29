import { useState } from "react";
import { userLogin } from "../ajaxHelper";
import { useOutletContext, Link } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secretkey, setSecretKey] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();

    async function submitAdmin(e) {
        e.preventDefault();
        const user = {
            user: {
                username,
                password,
                secretkey
            }
        };
        const response = await userLogin(user);

        if (response.error) {
            setPasswordErrorMessage("Username, password or secretkey are incorrect. Please try again");
        } else {
            localStorage.setItem('token', response.data.token);
            setIsLoggedIn(true);
        }
    }

    return (
        <div className="panel">
            {isLoggedIn ? (
                <h1>Welcome Back!</h1>
            ) : (
                <>
                    <h1>Admin Log In</h1>
                    <form onSubmit={submitAdmin}>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordErrorMessage('');
                            }}
                        />
                        <input
                            type="text"
                            value={secretkey}
                            placeholder="Secret Key"
                            onChange={(e) => {
                                setSecretKey(e.target.value);
                                setSecretKeyErrorMessage('');
                            }}
                        />
                        {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                        <button type="submit" className="submitButton">Log In</button>
                    </form>
                    <Link to="/Login" className="adminLink">Click here to return to login</Link>
                </>
            )}
        </div>
    );
};

export default AdminLogin;