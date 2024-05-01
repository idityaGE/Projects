import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { JWT_SECRET } from '../../../backend/config'
import { verify } from 'jsonwebtoken'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/signup')
      return
    }
    navigate('/dashboard')
  }, [navigate])

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  )
}

export default Home