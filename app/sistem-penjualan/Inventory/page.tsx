'use client'

import React, { useEffect, useState } from 'react'

interface Barang {
  id: number
  nama: string
  kategori: string
  stok: number
  harga: number
}

const Inventory = () => {
  const [data, setData] = useState<Barang[]>([])
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>('')

  // useEffect(() => {
  //   // Contoh fetch data, ganti dengan endpoint API Anda jika perlu
  //   fetch('/api/inventory')
  //     .then(res => res.json())
  //     .then(setData)
  //     .catch(console.error)
  // }, [])

  const kategoriUnik = Array.from(new Set(data.map(b => b.kategori)))

  const dataTampil = kategoriTerpilih
    ? data.filter(b => b.kategori === kategoriTerpilih)
    : data

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-pink-600 text-center">Inventory Barang</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter Kategori</label>
          <select
            value={kategoriTerpilih}
            onChange={(e) => setKategoriTerpilih(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Semua Kategori</option>
            {kategoriUnik.map((kategori, i) => (
              <option key={i} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-pink-100 text-left">
              <th className="p-3">Nama</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Stok</th>
              <th className="p-3">Harga</th>
            </tr>
          </thead>
          <tbody>
            {dataTampil.map(barang => (
              <tr key={barang.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{barang.nama}</td>
                <td className="p-3">{barang.kategori}</td>
                <td className="p-3">{barang.stok}</td>
                <td className="p-3">Rp{barang.harga.toLocaleString()}</td>
              </tr>
            ))}
            {dataTampil.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-4 text-gray-500">
                  Tidak ada data barang dalam kategori ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Inventory
