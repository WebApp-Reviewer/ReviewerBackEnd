import { Link } from "react-router-dom";

export default function Navbar({loggedIn, setUser, setLoggedIn, adminLoggedIn}) {
    return (
        <div>
            {loggedIn ? (
                <>
                <Link className="navbar-link" to="/websites">Websites</Link>
                <Link className="navbar-link" to="/reviews">Reviews</Link>
                <Link className="navbar-link" to="/reviews/create">Write a Review</Link>
                <Link className="navbar-link" to="/profile">Profile</Link>
                <Link className="navbar-link" to="/search">Search</Link>
                <Link className="navbar-link" to="/" onClick={() => {
                    localStorage.removeItem('user token')
                    setUser('')
                    setLoggedIn('')
                }}>Log Out</Link>
                </>
            ): (
                <>
                <Link className="navbar-link" to="/user/login">Login</Link>
                <Link className="navbar-link" to="/websites">Websites</Link>
                <Link className="navbar-link" to="/reviews">Reviews</Link>
                <Link className="navbar-link" to="/search">Search</Link>
                </>
            )}
        </div>
    )
}