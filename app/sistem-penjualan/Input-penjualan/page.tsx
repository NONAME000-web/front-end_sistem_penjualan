'use client'

import React, { useState } from 'react'

const Input_Data = () => {
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [date, setDate] = useState('')
  const [barang, setBarang] = useState('')
  const [jumlahBarang, setJumlahBarang] = useState('')
  const [hargaSatuan, setHargaSatuan] = useState('')
  const [kategoriBarang, setKategoriBarang] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ nama, email, date, barang, jumlahBarang, kategoriBarang })
    // Kirim data ke server di sini
  }

  return (
    <div className="p-6 md:p-10 bg-gray-100 min-h-screen">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Tambah Data Penjualan</h1>
        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Pembeli
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Pembelian
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Barang
            </label>
            <input
              type="text"
              value={barang}
              onChange={(e) => setBarang(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Nama Barang"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Barang
            </label>
            <input
              type="number"
              value={jumlahBarang}
              onChange={(e) => setJumlahBarang(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Jumlah Barang"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Barang
            </label>
            <input
              type="number"
              value={hargaSatuan}
              onChange={(e) => setHargaSatuan(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Harga Barang"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori Barang
            </label>
            <select
              value={kategoriBarang}
              onChange={(e) => setKategoriBarang(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="baju">Baju</option>
              <option value="celana">Celana</option>
              <option value="topi">Topi</option>
              <option value="jaket">Jaket</option>
              <option value="rok">Rok</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Simpan Data
          </button>
        </form>
      </div>
    </div>
  )
}

export default Input_Data
