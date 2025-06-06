import Navbar from '@/components/Navbar/page'
import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <Navbar />
        {children}
    </div>
  )
}

export default Layout