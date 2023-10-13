import { useState, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { fetchAllWebsites } from "../ajaxHelper";
import "../Style/Root.css";
import "../Style/Nav.css";
import Discord from "../assets/Discord.jpg";
import Netflix from "../assets/Netflix.jpg";
import Twitter from "../assets/Twitter.png";
import WebWatchers from "../assets/webwatchers-logo.png";
import Youtube from "../assets/Youtube.jpg";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { debounce } from "../Util/debounce";

export default function Root() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

 // Function to handle regular user login
  const handleUserLogin = async (credentials) => {
    const response = await userLogin(credentials);
    if (response.token) {
      setToken(response.token);
      setIsLoggedIn(true);
      // Store the token in local storage or elsewhere as needed
      localStorage.setItem("token", response.token);
    } else {
      // Handle login error
    }
  };

  // Function to handle admin user login
  const handleAdminLogin = async (credentials) => {
    const response = await adminLogin(credentials);
    if (response.adminToken) {
      setAdminToken(response.adminToken);
      setIsLoggedIn(true);
      // Store the admin token in local storage or elsewhere as needed
      localStorage.setItem("adminToken", response.adminToken);
    } else {
      // Handle login error
    }
  };
  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setIsLoggedIn(false);
  }
  function adminLogout() {
    localStorage.removeItem("adminToken");
    setAdminToken("");
    setIsLoggedIn(false);
  }

  useEffect(() => {
    if (!localStorage.getItem("websites")) {
      fetchAllWebsites().then((websites) => {
        localStorage.setItem("websites", JSON.stringify(websites));
      });
    }
  }, []);

  const handleDragStart = (e) => e.preventDefault();

  const items = [
    <img
      className="ImageGallery"
      src={Youtube}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      className="ImageGallery"
      src={Twitter}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      className="ImageGallery"
      src={Netflix}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      className="ImageGallery"
      src={Discord}
      onDragStart={handleDragStart}
      role="presentation"
    />,
  ];

  const Gallery = () => {
    return (
      <AliceCarousel
        autoPlay
        autoPlayControls
        autoPlayStrategy="none"
        autoPlayInterval={1000}
        animationDuration={1000}
        animationType="fadeout"
        infinite
        disableDotsControls
        disableButtonsControls
        mouseTracking
        items={items}
      />
    );
  };

  const handleScroll = debounce(() => {
    const currentScrollPos = window.scrollY;

    setVisible(
      (prevScrollPos > currentScrollPos &&
        prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 100);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  const navbarStyles = {
    position: "fixed",
    height: "60px",
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    transition: "top 0.6s",
    paddingTop: "15px",
    marginLeft: "-42px",
    display: "inline-block",
    backgroundColor: "#1b2430",
  };

  return (
    <div>
      <header>
        <div className="Logo">
          <Link to="/">
            <img src={WebWatchers} alt="Web Watchers Logo" />
          </Link>
        </div>
        <div>
          <Gallery />
        </div>
        <nav className="headerLink">
          <div style={{ ...navbarStyles, top: visible ? "0" : "-60px" }}>
            <div className="navbar">
              {!token && !adminToken && (
                <>
                  <Link to="WebsiteListings" className="linkStyle">
                    Homepage
                  </Link>
                  <Link to="Reviews" className="linkStyle">
                    Reviews
                  </Link>
                </>
              )}
              {!adminToken && token && (
                <>
                  <Link to="WebsiteListings" className="linkStyle">
                    Homepage
                  </Link>
                  <Link to="Reviews" className="linkStyle">
                    Reviews
                  </Link>
                  <Link to="profile" className="linkStyle">
                    Profile
                  </Link>
                </>
              )}
              {adminToken && (
                <>
                  <Link to="AdminCreateWebsites" className="linkStyle">
                    Create Websites
                  </Link>
                  <Link to="AdminWebsiteListings" className="linkStyle">
                    Edit Websites
                  </Link>
                  <Link to="AdminUserList" className="linkStyle">
                    User List
                  </Link>
                  <Link onClick={adminLogout} to="/" className="linkStyle" >
                    Log Out
                  </Link>
                </>
              )}
              {!token && !adminToken && (
                <>
                  <Link to="Register" className="linkStyle">
                    Register
                  </Link>
                  <Link to="Login" className="linkStyle">
                    Login
                  </Link>
                </>
              )}
              {token && !adminToken && (
                <Link onClick={logout} to="/" className="linkStyle">
                  Log Out
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main>
      {adminToken ? (
          <Outlet
            context={[adminToken, setAdminToken, isLoggedIn, setIsLoggedIn]}
          />
        ) : (
          <Outlet context={[token, setToken, isLoggedIn, setIsLoggedIn]} />
        )}
      </main>
    </div>
  );
}
