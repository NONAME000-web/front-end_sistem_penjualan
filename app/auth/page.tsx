'use client'

import React, { useState } from 'react'

const TestSendPage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [status, setStatus] = useState('');

  const handleSendOtp = async () => {
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      setStatus(data.status || 'No status returned');
    } catch (error: any) {
      setStatus('Error: ' + (error.message || 'Unknown error'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Test Kirim OTP via Resend</h2>
        <input
          type="email"
          placeholder="Email tujuan"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <input
          type="text"
          placeholder="OTP manual"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />
        <button
          onClick={handleSendOtp}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Kirim OTP
        </button>
        {status && <p className="mt-4 text-sm text-gray-700">Status: {status}</p>}
      </div>
    </div>
  );
};

export default TestSendPage;
