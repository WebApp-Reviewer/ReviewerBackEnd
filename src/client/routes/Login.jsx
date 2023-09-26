import { useState } from "react";
import { userLogin } from "../ajaxHelper";
import { useOutletContext } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useOutletContext();

    async function submitLogin(e) {
        e.preventDefault();
        const user = {
            user: {
                username,
                password
            }
        };
        const response = await userLogin(user);

        if (response.error) {
            setPasswordErrorMessage("Username or password incorrect. Please try again");
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
                    <h1>Log In</h1>
                    <form onSubmit={submitLogin}>
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
                        {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
                        <button type="submit" className="submitButton">Log In</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Login;