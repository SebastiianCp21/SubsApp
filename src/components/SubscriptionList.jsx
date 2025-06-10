import React, { useEffect, useState } from 'react'
import SubscriptionCard from './SubscriptionCard'

function SubscriptionList({ refresh, onChange }) {
  const [suscripciones, setSuscripciones] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/suscripciones')
      .then((res) => res.json())
      .then((data) => setSuscripciones(data))
      .catch((err) => console.error('Error al cargar suscripciones', err))
  }, [refresh])

  return (
    <div className="subscription-list">
      {suscripciones.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No tienes suscripciones aún. 🌌</p>
      ) : (
        suscripciones.map((sub) => (
          <SubscriptionCard key={sub.id} data={sub} onChange={onChange} />
        ))
      )}
    </div>
  )
}

export default SubscriptionList
