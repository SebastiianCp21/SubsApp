import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../styles/login.css'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
      const data = await res.json()

      if (data.length > 0) {
        // Autenticación exitosa
        localStorage.setItem('user', JSON.stringify(data[0]))
        Swal.fire('¡Bienvenido!', 'Has iniciado sesión correctamente.', 'success')
        navigate('/dashboard')
      } else {
        Swal.fire('Error', 'Correo o contraseña incorrectos', 'error')
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo conectar con el servidor', 'error')
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
      <p className="toggle-auth">
  ¿No tienes cuenta?{' '}
  <span onClick={() => navigate('/register')}>
    Regístrate aquí
  </span>
</p>
    </form>
  )
}

export default Login
