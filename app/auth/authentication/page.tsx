'use client'

import React, { useState, useEffect, ChangeEvent, FormEvent, useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense } from 'react'

interface InputFieldProps {
  type: string
  placeholder: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
  required?: boolean
  minLength?: number
}

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  className = '',
  required,
  minLength
}: InputFieldProps) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    minLength={minLength}
    className={`w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500 ${className}`}
    aria-label={placeholder}
  />
)

interface VerifyOTPResponse {
  status: string
  message?: string
}

export default function Wrapping(){
  return(
    <Suspense fallback={<div>Loading...</div>}>
      <Authentication />
    </Suspense>
  )
}

const Authentication = () => {
  const [otp, setOtp] = useState('')
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()

  const email = useMemo(() => searchParams.get('email'), [searchParams])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (!email) {
      setStatus('Email tidak ditemukan di URL.')
      setIsSubmitting(false)
      return
    }

    if (otp.trim().length < 6) {
      setStatus('Kode OTP minimal 6 karakter.')
      setIsSubmitting(false)
      return
    }

    try {
      const req = await fetch('http://localhost:8000/api/verify_otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      })

      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}`)
      }

      const res: VerifyOTPResponse = await req.json()
      setStatus(res.message || res.status)
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (status === 'OTP valid') {
      router.push('/sistem-penjualan/Dashboard')
    }
  }, [status, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Verifikasi OTP</h2>

        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Masukkan Kode OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            minLength={6}
          />

          <button type="submit" disabled={isSubmitting} className={`w-full bg-pink-500 text-white py-3 rounded-xl font-semibold text-lg transition 
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-pink-600'}`} aria-busy={isSubmitting}>
            {isSubmitting ? 'Memverifikasi...' : 'Verifikasi'}
          </button>
        </form>

        {status && (
          <p className={`mt-4 text-center text-sm ${status.includes('Error') || status.toLowerCase().includes('tidak') ? 'text-red-600' : 'text-gray-600'}`}>
            Status: {status}
          </p>
        )}

        {email && (
          <p className="mt-2 text-center text-xs text-gray-400">
            Email: {email}
          </p>
        )}
      </div>
    </div>
  )
}

// export default Authentication
