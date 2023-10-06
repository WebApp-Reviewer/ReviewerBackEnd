// import '../Style/Login.css'
// import { useState } from 'react';
// import { registerUser } from '../ajaxHelper';
// import { useOutletContext } from 'react-router-dom';

// const Register = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
//     const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
//     const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState('');
//     const [, setToken] = useOutletContext();
//     const [, setIsLoggedIn] = useOutletContext();

//     async function submitRegistration(e) {
//         e.preventDefault();

//         setUsernameErrorMessage('');
//         setPasswordErrorMessage('');
//         setConfirmPasswordErrorMessage('');

//         if (!username) {
//             setUsernameErrorMessage("Username is required");
//         } else if (password.length < 8) {
//             setPasswordErrorMessage("Password needs to be a minimum of 8 characters");
//         } else if (password !== confirmPassword) {
//             setConfirmPasswordErrorMessage("Passwords must match");
//         } else {
//             const user = {
//                 user: {
//                     username,
//                     password
//                 }
//             };
//             const response = await registerUser(user);

//             if (response.error) {
//                 setUsernameErrorMessage("User already exists, please login instead.");
//             } else {
//                 localStorage.setItem('token', response.data.token);
//                 setToken(response.data.token);
//                 setIsLoggedIn(true);
//             }
//         }
//     }

//     return (
//         <div className="panel">
//             <h1>Register Page</h1>
//             <form onSubmit={submitRegistration}>
//                 <input
//                     type="text"
//                     value={username}
//                     placeholder="Username"
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 {usernameErrorMessage && <p>{usernameErrorMessage}</p>}
//                 <input
//                     type="password"
//                     value={password}
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
//                 <input
//                     type="password"
//                     value={confirmPassword}
//                     placeholder="Confirm Password"
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                 />
//                 {confirmPasswordErrorMessage && <p>{confirmPasswordErrorMessage}</p>}
//                 <button type="submit" className="submitButton">Register</button>
//             </form>
//         </div>
//     );
// };

// export default Register;

import "../Style/Login.css";
import { useState } from "react";
import { registerUser } from "../ajaxHelper";
import { useOutletContext, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();

  const navigate = useNavigate();

  async function submitRegistration(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError({ message: "The Passwords must be the same." });
    }
    const user = {
      username,
      password,
    };

    const response = await registerUser(user);

    if (response.error) {
      console.log(error, "Message");
      setPasswordErrorMessage(
        "Username or password incorrect. Please try again"
      );
    } else {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(true);
    }
    navigate("/");
  }

  return (
    <div className="panel" id="Center">
      {isLoggedIn ? (
        <h1>Welcome Aboard</h1>
      ) : (
        <>
          <h1 className="Header" id="CenterText">
            Register
          </h1>
          <form className="LoginBox" onSubmit={submitRegistration}>
            <input
              type="text"
              value={username}
              placeholder="Username"
              required={true}
              minLength={4}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="Confirm Password"
              required={true}
              minLength={7}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErrorMessage("");
              }}
            />
            <input
              type="password"
              value={confirmPassword}
              placeholder="Password"
              required={true}
              minLength={7}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setPasswordErrorMessage("");
              }}
            />
            {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
            <button type="submit" className="submitButton">
              Register
            </button>
          </form>
        </>
      )}
    </div>
  );
}
