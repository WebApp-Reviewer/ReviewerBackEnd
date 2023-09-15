import { useState, useEffect } from 'react';
import MainDemo from './components/MainDemo';
import Navigation from './components/navbar';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('user token');
    //This will ask for the token to be retrieved
    if (token) {
      setLoggedIn(true); //Once the token is returned it will log you in
      const username = localStorage.getItem('username'); //This one will find your username in the system
      setUser(username); //This will set your username once found and verified
    }
    setIsLoading(false);
  }, [user])

  return (
    <div className="appStyle">
      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />
      <MainDemo isLoading={isLoading} user={user} setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </div>
  )
}

export default App
