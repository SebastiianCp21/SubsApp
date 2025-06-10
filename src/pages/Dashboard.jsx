import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../auth'
import Navbar from '../components/Navbar'
import SubscriptionForm from '../components/SubscriptionForm'
import SubscriptionList from '../components/SubscriptionList'
import '../styles/dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [refresh, setRefresh] = useState(false)

  
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/')
    }
  }, [navigate])

  
  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">📺 Tus Suscripciones</h1>
        <SubscriptionForm onAdd={handleRefresh} />
        <SubscriptionList refresh={refresh} onChange={handleRefresh} />
      </div>
    </>
  )
}

export default Dashboard
