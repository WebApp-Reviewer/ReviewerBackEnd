import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import AdminLogin from './AdminLogin'
import Websites from './Websites'
import Reviews from './Reviews'
import Profile from './Profile'
import Register from './Register'

export default function Main({ setLoggedIn, setUser, loggedIn, user }) {
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login 
                setLoggedIn={setLoggedIn}
                setUser={setUser} />} />

                <Route path='/login' element={<AdminLogin
                setLoggedIn={setLoggedIn}
                setUser={setUser} />} />

                <Route path='/register' element={<Register
                setLoggedIn={setLoggedIn}
                setUser={setUser} />} />

                <Route path='/websites' element={<Websites />} />

                <Route path='/reviews' element={<Reviews 
                loggedIn={loggedIn}
                user={user} />} />

                <Route path='/users/:id' element={<Profile 
                loggedIn={loggedIn}
                user={user} />} />
            </Routes>
        </div>
    )
}