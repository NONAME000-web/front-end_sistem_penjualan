'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const InputField = ({ type, placeholder, value, onChange }: any) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
  />
);

const Authentication = () => {
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // tangkap ?email=... dari URL
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setStatus("Email tidak ditemukan di URL");
      return;
    }

    try {
      const req = await fetch('http://localhost:8000/api/verify_otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }), // kirim email + otp ke PHP
      });

      if (!req.ok) throw new Error('Network response was not ok');

      const res = await req.json();
      setStatus(res.message || res.status);
    } catch (error) {
      setStatus('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  useEffect(() => {
    if(status === "OTP valid") {
      // Redirect ke halaman dashboard atau halaman lain setelah verifikasi sukses
      window.location.href = '/sistem-penjualan/Dashboard'; // ganti dengan URL yang sesuai
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Verifikasi OTP</h2>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="Masukkan Kode OTP"
            value={otp}
            onChange={(e: any) => setOtp(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold text-lg"
          >
            Verifikasi
          </button>
        </form>
        {status && <p className="mt-4 text-center text-sm text-gray-600">Status: {status}</p>}
        {email && <p className="mt-2 text-center text-xs text-gray-400">Email: {email}</p>}
      </div>
    </div>
  )
}

export default Authentication;
