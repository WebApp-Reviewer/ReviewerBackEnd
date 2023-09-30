import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import Login from './Login'
import AdminLogin from './AdminLogin'
import Websites from './Websites'
import Reviews from './Reviews'
import Profile from './Profile'
import Register from './Register'

export default function Main({ setLoggedIn, setUser, loggedIn, user, adminLoggedIn, setAdminLoggedIn }) {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/search' element={<Search />} />

                <Route path='/admin/login' element={<AdminLogin
                setAdminLoggedIn={setAdminLoggedIn} />} />
                
                <Route path='/users/login' element={<Login 
                setLoggedIn={setLoggedIn}
                setUser={setUser} />} />

                <Route path='/register' element={<Register
                setLoggedIn={setLoggedIn}
                setUser={setUser} />} />

                <Route path='/websites' element={<Websites />} />

                <Route path='/reviews' element={<Reviews />} />

                <Route path='/users/:id' element={<Profile 
                loggedIn={loggedIn}
                user={user} />} />
            </Routes>
        </div>
    )
}