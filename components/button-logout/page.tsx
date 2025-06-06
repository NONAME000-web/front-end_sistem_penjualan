'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Button_Logout = () => {
    const router = useRouter()
    
    const handleLogout = () => {
        window.localStorage.removeItem('token') // Hapus token dari localStorage
        window.location.href = '/' // Redirect ke halaman login
    }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md shadow">
      Logout
    </button>
  )
}

export default Button_Logout