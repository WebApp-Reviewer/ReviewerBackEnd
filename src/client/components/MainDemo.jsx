import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import LogIn from './Login';
import AdminLogIn from './AdminLogin';
import SignUp from './Signup'

function MainDemo() {
  const isLoggedIn = true; // Replace with your authentication logic
  const isAdmin = true; // Replace with your admin authentication logic

  return (
    <div>
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminLogin" element={<AdminLogIn />} />
      </Routes>
    </div>
  );
}

export default MainDemo;