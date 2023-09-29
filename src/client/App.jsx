import { useState, useEffect } from 'react'
import Main from './components/Main'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('user token');
    if (token) {
      //if token is present user is logged in
      setLoggedIn(true);
      //get user's username
      const username = localStorage.getItem('username');
      setUser(username);
    }
    setIsLoading(false);
  }, [user])

  return (
    <div>
      <Main 
      isLoading={isLoading}
      user={user}
      setUser={setUser}
      loggedIn={loggedIn}
      setLoggedIn={setLoggedIn} />
    </div>
  );
}

export default App;