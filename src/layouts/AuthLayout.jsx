import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function AuthLayout() {

  const user = JSON.parse(localStorage.getItem("user"))

  if(user){
      return <Navigate to='*' replace />
  }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default AuthLayout