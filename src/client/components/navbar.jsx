import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navigation({ loggedIn, setUser, setLoggedIn }) {
  return (
    <div className="navigation">
      {loggedIn ? (
        <>
          <Link className="navigation-links" to="/posts">
            Postings
          </Link>
          <Link className="navigation-links" to="/profile">
            Personal Profile
          </Link>
          <Link className="navigation-links" to="/messages">
            Mail
          </Link>
          <Link className="navigation-links" to="/newpost">
            Create a Post
          </Link>
          <Link className="navigation-links" to="/search">
            Search
          </Link>
          <Link
            className="navigation-links"
            to="/"
            onClick={() => {
              localStorage.removeItem("user token");
              setUser("");
              setLoggedIn("");
            }}
          >
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link className="navigation-links" to="/login">
            Login
          </Link>
          <Link className="navigation-links" to="/signup">
            Sign Up
          </Link>
          <Link className="navigation-links" to="/reviews">
            Reviews
          </Link>
        </>
      )}
    </div>
  );
}
