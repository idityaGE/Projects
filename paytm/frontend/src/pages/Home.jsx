import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    } else {
      navigate('/signin')
    }
  }, [navigate])
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  )
}

export default Home