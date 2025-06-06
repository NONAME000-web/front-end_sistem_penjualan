'use client'
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername !== null) {
      setUsername(savedUsername);
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Selamat datang, {username}!</p>
    </div>
  )
}

export default Dashboard;
