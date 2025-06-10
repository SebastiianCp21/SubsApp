import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../styles/register.css'

function Register() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return Swal.fire('Error', 'Las contraseñas no coinciden', 'error')
    }

    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}`)
      const data = await res.json()

      if (data.length > 0) {
        Swal.fire('Oops', 'Ya existe un usuario con este correo', 'warning')
        return
      }

      const newUser = { email, password }
      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })

      Swal.fire('¡Registrado!', 'Tu cuenta ha sido creada con éxito', 'success')
      navigate('/')
    } catch (error) {
      Swal.fire('Error', 'Algo falló en el servidor', 'error')
    }
  }

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2>Crear Cuenta</h2>
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
      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Registrar</button>
<p className="toggle-auth">
  ¿Ya tienes cuenta?{' '}
  <span onClick={() => navigate('/')}>
    Inicia sesión
  </span>
</p>

    </form>
  )
}

export default Register
