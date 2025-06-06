'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const InputField = ({ type, placeholder, value, onChange }: any) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
  />
);

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  // Fungsi untuk mengirim OTP ke email
  const handleSendCode = async () => {
    if (!email || !otp) {
      alert("Email atau OTP tidak tersedia.");
      return;
    }

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }), // gunakan OTP dari login
      });

      const data = await res.json();
      if (data.status === 'sukses') {
        alert('Kode OTP telah dikirim ke email.');
      } else {
        alert('Gagal mengirim OTP.');
      }
    } catch (err) {
      alert('Terjadi kesalahan saat mengirim OTP.');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const req = await fetch('http://localhost:8000/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const res = await req.json();
      setStatus(res.status);

      if (res.status === 'sukses') {
        setEmail(res.data.email); // ambil email dari login.php
        setOtp(res.data.otp);     // simpan OTP dari login.php (jangan generate ulang)
      }
    } catch (error) {
      setStatus('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome In Page Login!</h2>
        <form onSubmit={handleSubmit}>
          <InputField type="text" placeholder="Username" value={username} onChange={(e: any) => setUsername(e.target.value)} />
          <InputField type="password" placeholder="Password" value={password} onChange={(e: any) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-pink-500 text-white py-3 rounded-xl font-semibold text-lg">Login</button>
        </form>

        {/* Tombol kirim kode OTP */}
        {status === 'sukses' && (
          <button
            onClick={handleSendCode}
            className="w-full mt-4 bg-blue-500 text-white py-3 rounded-xl font-semibold text-lg"
          >
            Kirim Kode OTP
          </button>
        )}

        <p className="text-sm text-center mt-4">
          Don't have an account? <a href="/auth/register" className="text-pink-500 font-semibold">Sign Up</a>
        </p>
        {status && <p className="mt-4 text-center text-sm text-gray-600">Status: {status}</p>}
        {status === "sukses" && <p className="text-green-600 mt-2 text-center">Selamat datang: {username}</p>}
      </div>
    </div>
  );
};

export default Login;
