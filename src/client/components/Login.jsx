import { useState } from "react";
import { userLogin } from "../ajaxHelper";
import { useOutletContext, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useOutletContext();

  async function submitLogin(e) {
    e.preventDefault();

    const user = {
      username,
      password,
    };

    const response = await userLogin(user);

    if (response.error) {
      console.log(error, "Message");
      setPasswordErrorMessage(
        "Username or password incorrect. Please try again"
      );
    } else {
      localStorage.setItem('token', JSON.stringify(response.token));
      setIsLoggedIn(true);

      window.location.reload();
    }
  }

  return (
    <div className="panel" id="Center">
      {isLoggedIn ? (
        <h1>Welcome Back!</h1>
      ) : (
        <>
          <h1 className="Header" id="CenterText">
            Log In
          </h1>
          <form className="LoginBox" onSubmit={submitLogin}>
          <label className="login-label">
              Username:{" "}
            <input
              className="login-input"
              type="text"
              name="username"
              value={username}
              required={true}
              minLength={3}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            </label>
            <label className="login-label">
              Password:{" "}
            <input
              className="login-input"
              type="password"
              name="password"
              value={password}
              required={true}
              minLength={3}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordErrorMessage("");
              }}
            />
            </label>
            {passwordErrorMessage && <p>{passwordErrorMessage}</p>}
            <button type="submit" className="submitButton">
              Log In
            </button>
          </form>
          <Link to="/AdminLogin" className="adminLink" id="CenterText">
            Click here for admin login
          </Link>
        </>
      )}
    </div>
  );
};
export default Login;
