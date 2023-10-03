import '../Style/Login.css'
// import { useState,} from "react";
// import { userLogin } from "../ajaxHelper";
// import { useOutletContext, Link } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
//     const [isLoggedIn, setIsLoggedIn] = useOutletContext();

//     const navigate = useNavigate();

//     async function submitLogin(e) {
//         e.preventDefault();
//         console.log({submitLogin});

//         const user = {
//             user: {
//                 username,
//                 password,
//             }
//         };

//         const response = await userLogin(user);

//         if (response.error) {
//             console.log(error)
//             setPasswordErrorMessage("Username or password incorrect. Please try again");
//         } else {
//             localStorage.setItem('token', response.token);
//             setIsLoggedIn(true);
//         }
//         navigate('/WebsiteListings');
//     }

//     return (
//         <div className="panel" id="Center">
//             {isLoggedIn ? (
//                 <h1>Welcome Back!</h1>
//             ) : (
//                 <>
//                     <h1 className='Header' id="CenterText">Log In</h1>
//                     <form className='LoginBox' onSubmit={submitLogin}>
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
//                         {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
//                         <button type="submit" className="submitButton">Log In</button>
//                     </form>
//                     <Link to="/AdminLogin" className="adminLink" id="CenterText">Click here for admin login</Link>
//                 </>
//             )}
//         </div>
//     );
// };
// export default Login;

import React, { useState } from "react";
import { userLogin } from "../ajaxHelper";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Call the userLogin function from ajaxHelper.js
    const response = await userLogin(username, password);

    if (response.error) {
      // Handle login error
      setErrorMessage("Username or password is incorrect. Please try again.");
    } else {
      // Login successful, redirect or perform other actions
      console.log("Login successful!");
      // Redirect to another page, e.g., history.push("/dashboard");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
