
import React from 'react'
import  {Navigate, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux';



function ProtectedRoute() {

const userId = localStorage.getItem("userId")


// const user = useSelector(
// (state)=>state.user.user
// );



if(!userId){
    return <Navigate to='/login' replace />
}


// if(!user){
//   return <Navigate to = '/login' replace/>
// }

// if(user.role === "admin"){
//   return <Navigate to="/admin" replace/>
// }

  return (
<Outlet/>
  )
}

export default ProtectedRoute