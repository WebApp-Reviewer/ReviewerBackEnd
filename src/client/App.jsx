import { useState, useEffect } from 'react'
import Main from './components/Main'
import Navbar from './components/Navbar'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('user token');
    if (token) {
      //if token is present user is logged in
      setLoggedIn(true);
      //if token is present admin is logged in
      setAdminLoggedIn(true);
      //get user's username
      const username = localStorage.getItem('username');
      setUser(username);
    }
    setIsLoading(false);
  }, [user])

  return (
    <div>
      <Navbar 
      loggedIn={loggedIn} 
      setLoggedIn={setLoggedIn}
      setUser={setUser} 
      adminLoggedIn={adminLoggedIn}
      setAdminLoggedIn={setAdminLoggedIn} />
      <Main 
      isLoading={isLoading}
      user={user}
      setUser={setUser}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn}
      adminLoggedIn={adminLoggedIn}
      setAdminLoggedIn={setAdminLoggedIn} />
    </div>
  );
}

export default App;