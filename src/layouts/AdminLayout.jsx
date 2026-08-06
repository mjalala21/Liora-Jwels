import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'

function AdminLayout() {
  return (
    <div className='flex gap-30'>
        <Sidebar/>
        <Outlet/>

    </div>
  )
}

export default AdminLayout