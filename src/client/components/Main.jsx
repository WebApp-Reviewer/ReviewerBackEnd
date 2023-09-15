import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Signup from './Signup';
import Login from './Login';
import Sites from './Sites';
import Reviews from './Reviews';
import ItemDetail from './ItemDetail';
import UserProfile from './UserProfile';
import PostReview from './PostReview';
import AdminViewItems from './AdminViewItems';
import AdminAddItem from './AdminAddItem';
import AdminEditItem from './AdminEditItem';
import AdminRemoveItem from './AdminRemoveItem';

function Main() {
  const isLoggedIn = true; // Replace with your authentication logic
  const isAdmin = true; // Replace with your admin authentication logic

  return (
    <div>
    <Router>
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/item/:itemId" element={<ItemDetail />} />
        <Route path="/profile/:userId" element={<UserProfile />} />

        {/* Logged-In User Routes */}
        {isLoggedIn && (
          <>
            <Route path="/logout" element={<Logout />} />
            <Route path="/post-review/:itemId" element={<PostReview />} />
          </>
        )}

        {/* Admin Routes */}
        {isAdmin && (
          <>
            <Route path="/admin/view-items" element={<AdminViewItems />} />
            <Route path="/admin/add-item" element={<AdminAddItem />} />
            <Route path="/admin/edit-item/:itemId" element={<AdminEditItem />} />
            <Route path="/admin/remove-item/:itemId" element={<AdminRemoveItem />} />
          </>
        )}
      </Routes>
    </Router>
    </div>
  );
}

export default Main;