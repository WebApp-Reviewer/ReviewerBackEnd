import "../Style/Login.css";
import { useState } from "react";
import { useOutletContext, Link } from "react-router-dom";
import { adminLogin } from "../ajaxHelper";

export default function AdminLogin() {
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [adminErrorMessage, setAdminErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();


  async function submitAdminLogin(event) {
    event.preventDefault();

    const admin = {
      username: adminUsername,
      password: adminPassword,
      secret,
    };

    const response = await adminLogin(admin);

    if (response.error) {
      setAdminErrorMessage(
        "Admin username or password was entered incorrectly, Try entering it again."
      );
    } else {
      localStorage.setItem("adminToken", response.token);
      setIsLoggedIn(true);

      window.location.reload();
    }
  }

  return (
    <div className="panel" id="Center">
      {isLoggedIn ? (
        <h1>Welcome Back Admin!</h1>
      ) : (
        <>
          <h1 className="Header" id="CenterText">
            Admin Login!
          </h1>
          <form className="LoginBox" onSubmit={submitAdminLogin}>
            <label className="login-label">
              Username:{" "}
              <input
                className="login-input"
                type="text"
                name="username"
                placeholder="Username"
                required={true}
                minLength={3}
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
              />
            </label>
            <label className="login-label">
              Password:{" "}
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Password"
                required={true}
                minLength={7}
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
            </label>
            <label className="login-label">
              Secret Key:{" "}
              <input
                className="login-input"
                type="password"
                name="password"
                placeholder="Secret Key"
                required={true}
                minLength={7}
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
              />
            </label>
            {adminErrorMessage && <p>{adminErrorMessage}</p>}
            <button type="submit" className="submitButton">
              Log In
            </button>
          </form>
          <Link to="/Login" className="adminLink">
            Click here to return to login
          </Link>
        </>
      )}
    </div>
  );
}
