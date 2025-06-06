'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'
import Link from 'next/link'

interface InputFieldProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const InputField = ({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  className = '' 
}: InputFieldProps) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
  />
)

interface LoginResponse {
  status: 'sukses' | 'gagal'
  data?: {
    email: string
    otp: string
  }
  message?: string
}

interface OTPResponse {
  status: 'sukses' | 'gagal'
  message?: string
}

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendCode = async () => {
    if (!email || !otp) {
      alert('Email atau OTP tidak tersedia.')
      return
    }

    setIsLoading(true)
    
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      const data: OTPResponse = await res.json()
      
      if (data.status === 'sukses') {
        alert(data.message || 'Kode OTP telah dikirim ke email.')
      } else {
        alert(data.message || 'Gagal mengirim OTP.')
      }
    } catch (err) {
      alert('Terjadi kesalahan saat mengirim OTP.')
      console.error('Error sending OTP:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const req = await fetch('http://localhost:8000/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const res: LoginResponse = await req.json()
      setStatus(res.status)

      if (res.status === 'sukses' && res.data) {
        setEmail(res.data.email)
        setOtp(res.data.otp)
      }
    } catch (error) {
      setStatus(
        error instanceof Error 
          ? `Error: ${error.message}` 
          : 'Unknown error occurred'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome In Page Login!</h2>
        
        <form onSubmit={handleSubmit}>
          <InputField 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          
          <InputField 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full bg-pink-500 text-white py-3 rounded-xl font-semibold text-lg ${
              isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-pink-600'
            }`}
          >
            {isLoading ? 'Processing...' : 'Login'}
          </button>
        </form>

        {status === 'sukses' && (
          <button onClick={handleSendCode} disabled={isLoading} className={`w-full mt-4 bg-blue-500 text-white py-3 rounded-xl font-semibold text-lg 
            ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-600'}`}>
            {isLoading ? 'Sending OTP...' : 'Kirim Kode OTP'}
          </button>
        )}

        <p className="text-sm text-center mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-pink-500 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
        
        {status && (
          <p className={`mt-4 text-center text-sm ${status === 'sukses' ? 'text-green-600' : 'text-red-600'}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  )
}

export default Login