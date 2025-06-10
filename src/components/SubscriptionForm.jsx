import React, { useState } from 'react'
import Swal from 'sweetalert2'
import '../styles/Form.css'

function SubscriptionForm({ onAdd }) {
  const [form, setForm] = useState({
    nombre: '',
    costo: '',
    categoria: '',
    fechaRenovacion: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const nuevaSub = { ...form }

    try {
      const res = await fetch('http://localhost:3000/suscripciones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaSub)
      })

      if (res.ok) {
        Swal.fire('¡Agregado!', 'La suscripción fue creada con éxito.', 'success')
        setForm({ nombre: '', costo: '', categoria: '', fechaRenovacion: '' })
        onAdd() // Refresca la lista
      } else {
        Swal.fire('Error', 'No se pudo guardar', 'error')
      }
    } catch (err) {
      Swal.fire('Error', 'Error de conexión con el servidor', 'error')
    }
  }

  return (
    <form className="subscription-form" onSubmit={handleSubmit}>
      <h3>➕ Nueva Suscripción</h3>

      <input
        type="text"
        name="nombre"
        placeholder="Nombre del servicio"
        value={form.nombre}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="costo"
        placeholder="Costo mensual"
        value={form.costo}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="categoria"
        placeholder="Categoría"
        value={form.categoria}
        onChange={handleChange}
        required
      />

      <input
        type="date"
        name="fechaRenovacion"
        value={form.fechaRenovacion}
        onChange={handleChange}
        required
      />

      <button type="submit">Guardar</button>
    </form>
  )
}

export default SubscriptionForm
