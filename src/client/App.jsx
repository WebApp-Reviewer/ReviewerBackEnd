// import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from "./routes/Root.jsx";
import WebsiteListings from './routes/WebsiteListings.jsx';
import ProfileHandler from './routes/Profile.jsx';
import Register from "./routes/Register.jsx"; 
import LoginHandler from "./routes/Login.jsx"; 
import SingleWebsite from './components/SingleWebsite.jsx';
import AdminLogin from './routes/adminLogin.jsx';
import ReviewList from './routes/Reviews.jsx';
import AdminWebsiteListings from './routes/AdminWebsites.jsx';
import AdminCreateWebsites from './routes/AdminCreateWebsites.jsx'
import AdminUserList from './routes/AdminUsers.jsx';
import SingleWebsitePage from './routes/SingleWebsite.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "WebsiteListings", // Updated path
        element: <WebsiteListings />,
      },
      {
        path: "websites/:id", // Updated path
        element: <SingleWebsitePage />,
      },
      {
        path: "Profile",
        element: <ProfileHandler />,
      }, 
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "Login",
        element: <LoginHandler />,
      },
      {
        path: "Reviews",
        element: <ReviewList />,
      },
      {
        path: "AdminLogin",
        element: <AdminLogin />,
      },
      {
        path: "AdminWebsiteListings", // Updated path
        element: <AdminWebsiteListings />,
      },
      {
        path: "AdminCreateWebsites", // Updated path
        element: <AdminCreateWebsites />,
      },
      {
        path: "AdminUserList", // Updated path
        element: <AdminUserList />,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
