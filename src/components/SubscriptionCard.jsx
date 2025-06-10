import React, { useState } from 'react'
import Swal from 'sweetalert2'

function SubscriptionCard({ data, onChange }) {
  const [modoEdicion, setModoEdicion] = useState(false)
  const [form, setForm] = useState(data)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta suscripción será eliminada para siempre.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/suscripciones/${data.id}`, {
          method: 'DELETE'
        }).then(() => {
          Swal.fire('Eliminado', 'La suscripción fue eliminada', 'success')
          onChange()
        })
      }
    })
  }

  const handleUpdate = () => {
    fetch(`http://localhost:3000/suscripciones/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    }).then(() => {
      Swal.fire('Actualizado', 'La suscripción fue modificada', 'success')
      setModoEdicion(false)
      onChange()
    })
  }

  return (
    <div className="subscription-card">
      {modoEdicion ? (
        <>
          <input name="nombre" value={form.nombre} onChange={handleChange} />
          <input name="costo" value={form.costo} onChange={handleChange} type="number" />
          <input name="categoria" value={form.categoria} onChange={handleChange} />
          <input name="fechaRenovacion" value={form.fechaRenovacion} onChange={handleChange} type="date" />
          <button onClick={handleUpdate}>Guardar</button>
          <button onClick={() => setModoEdicion(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <h4>{data.nombre}</h4>
          <p><strong>Categoría:</strong> {data.categoria}</p>
          <p><strong>Costo:</strong> ${data.costo}</p>
          <p><strong>Renovación:</strong> {data.fechaRenovacion}</p>
          <button onClick={() => setModoEdicion(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </>
      )}
    </div>
  )
}

export default SubscriptionCard
