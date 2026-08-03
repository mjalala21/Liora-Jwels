import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';

function AuthLayout() {

 const user = useSelector((state) => state.user.user);

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