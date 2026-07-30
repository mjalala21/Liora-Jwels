import React from 'react'
import Navbar from '../components/layout/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'

function UserLayout() {
  return (
    <div className='relative'>
      <div className='absolute top-0 left-0 w-full '>
        <Navbar />
        </div>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default UserLayout