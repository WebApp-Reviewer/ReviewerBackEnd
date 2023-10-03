import '../Style/Login.css'
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
