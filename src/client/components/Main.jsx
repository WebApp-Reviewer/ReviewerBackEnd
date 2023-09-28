import { Routes, Route } from 'react-router-dom'
import Reviews from './Reviews'

export default function Main({ setLoggedIn, setUser, loggedIn, user }) {
    return (
        <div>
            <Routes>
                <Route path='/reviews' element={<Reviews 
                loggedIn={loggedIn}
                user={user} />} />
            </Routes>
        </div>
    )
}