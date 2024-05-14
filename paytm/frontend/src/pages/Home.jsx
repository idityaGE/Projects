import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/signup')
      return
    }
    // jwt.verify(token, JWT_SECRET, (err, decoded) => {
    //   console.log(decoded)
    //   if (err) {
    //     localStorage.removeItem('token')
    //     navigate('/signup')
    //     return
    //   }
    //   navigate('/dashboard')
    // })
    navigate('/dashboard')
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
    </div>
  )
}

export default Home