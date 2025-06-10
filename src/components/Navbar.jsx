import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../auth'
import '../styles/Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <h2>Bienvenido</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </nav>
  )
}

export default Navbar
