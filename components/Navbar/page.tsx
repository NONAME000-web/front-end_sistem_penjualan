'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button_Logout from '../button-logout/page'

// Daftar menu navigasi
const model = [
  {
    id: '/sistem-penjualan/Dashboard',
    title: 'Dashboard',
  },
  {
    id: '/sistem-penjualan/Input-penjualan',
    title: 'Input Penjualan',
  },
  {
    id: '/sistem-penjualan/Inventory',
    title: 'Inventory',
  },
]

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="text-xl font-bold text-orange-500">Denim Mart Local</div>
      <div className="flex space-x-6">
        <Button_Logout />
        {model.map((item) => (
          <Link key={item.id} href={item.id}>
            <span
              className={`cursor-pointer text-sm font-medium hover:text-orange-600 ${
                pathname === item.id ? 'text-orange-600 font-semibold' : 'text-gray-700'
              }`}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar;
