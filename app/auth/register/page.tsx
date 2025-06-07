'use client'
import { useState, FormEvent, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface RegisterResponse {
  status: 'sukses' | 'gagal'
  message?: string
}

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  })
  const [status, setStatus] = useState<{ message: string; isError: boolean }>({
    message: '',
    isError: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ message: '', isError: false })

    try {
      const res = await fetch('http://localhost:8000/api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data: RegisterResponse = await res.json()
      
      if (data.status === 'sukses') {
        setStatus({
          message: data.message || 'Registration successful! Redirecting...',
          isError: false
        })
        setTimeout(() => router.push('/'), 1500)
      } else {
        setStatus({
          message: data.message || 'Registration failed',
          isError: true
        })
      }
    } catch (error) {
      setStatus({
        message: `Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        isError: true
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            aria-label="Username"
          />
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Email"
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            aria-label="Password"
          />
          
          <button type="submit" disabled={isSubmitting} className={`w-full bg-pink-500 text-white py-3 rounded-lg transition 
          ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-pink-600'}`} aria-busy={isSubmitting}>
            {isSubmitting ? 'Processing...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link href="/" className="text-pink-500 font-semibold hover:underline" aria-label="Login">
              Login
            </Link>
          </p>
          
          {status.message && (
            <p className={`mt-2 text-sm text-center ${status.isError ? 'text-red-500' : 'text-green-500'}`}>
              {status.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}