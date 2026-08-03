import React from 'react'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'

function UserLayout() {
  return (
    <div className='relative'>

      <Navbar />

      <Outlet />

      <Footer />

    </div>
  )
}

export default UserLayout