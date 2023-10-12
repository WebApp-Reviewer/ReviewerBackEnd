import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import AdminLogin from './AdminLogin'
import AdminWebsites from './AdminWebsites'
import AdminUsers from './AdminUsers'
import WebsiteListings from './WebsiteListings'
import Reviews from './Reviews'
import Register from './Register'
import AdminCreateWebsite from './AdminCreateWebsite'
import Profile from './Profile'
import SingleWebsite from './SingleWebsite'
import CreateReview from './CreateReview'


export default function Main({ setLoggedIn, setUser, loggedIn, user, adminLoggedIn, setAdminLoggedIn }) {
    return (
        <div>
            <Routes>

                <Route path='/profile' element={<Profile 
                loggedIn={loggedIn} 
                user={user} />} />

                <Route path='/login' element={<Login 
                setLoggedIn={setLoggedIn}
                setUser={setUser} />} />

                <Route path='/register' element={<Register
                setLoggedIn={setLoggedIn}
                setUser={setUser} />} />

                <Route path='/websites' element={<WebsiteListings />} />

                <Route path='/websites/:id' element={<SingleWebsite />} />

                <Route path='/reviews' element={<Reviews 
                setLoggedIn={loggedIn}
                user={user} />} />

                <Route path='/reviews/create' element={<CreateReview 
                setLoggedIn={loggedIn}
                user={user} />} />
                
                <Route path='/admin/login' element={<AdminLogin
                setAdminLoggedIn={setAdminLoggedIn}
                setUser={setUser} />} />

                <Route path='/admin/websites' element={<AdminWebsites
                setAdminLoggedIn={adminLoggedIn}
                setUser={setUser} />} />

                <Route path='/admin/users' element={<AdminUsers
                setAdminLoggedIn={adminLoggedIn}
                setUser={setUser} />} />

                <Route path='/admin/websites/create' element={<AdminCreateWebsite
                setAdminLoggedIn={adminLoggedIn}
                setUser={setUser} />} />
                
            </Routes>
        </div>
    )
}