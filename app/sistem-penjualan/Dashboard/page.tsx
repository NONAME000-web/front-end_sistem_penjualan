'use client'

import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const Dashboard = () => {
  const [totalPemasukkan, setTotalPemasukkan] = useState(0);

  // Dummy data untuk tampilan
  const totalOrder = 920;
  const monthlyData = [
    { bulan: 'Jan', total: 3500 },
    { bulan: 'Feb', total: 4200 },
    { bulan: 'Mar', total: 3800 },
    { bulan: 'Apr', total: 4600 },
    { bulan: 'Mei', total: 5000 },
    { bulan: 'Jun', total: 5400 },
    { bulan: 'Jul', total: 6000 },
    { bulan: 'Agu', total: 5800 },
    { bulan: 'Sep', total: 6200 },
    { bulan: 'Okt', total: 7000 },
    { bulan: 'Nov', total: 7500 },
    { bulan: 'Des', total: 8000 },
  ];

  useEffect(() => {    
    const total = monthlyData.reduce((acc, item) => acc + item.total, 0);
    setTotalPemasukkan(total);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="text-lg mb-8">Selamat datang di Sistem Informasi Manajemen Penjualan</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Total Pemasukkan</h2>
          <p className="text-2xl font-bold text-green-600">${totalPemasukkan.toLocaleString()}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-gray-500 text-sm">Jumlah Order</h2>
          <p className="text-2xl font-bold text-blue-600">{totalOrder}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">Pemasukkan Bulanan</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="bulan" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#fb923c" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
