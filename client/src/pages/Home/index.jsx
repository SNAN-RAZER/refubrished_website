import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {
  const {user} = useSelector(state => state.user);
  return (
    <div>
    {user && <h1>{user.username}</h1>}
    <h1>Home</h1>
    </div>
  
  )
}

export default Home;
