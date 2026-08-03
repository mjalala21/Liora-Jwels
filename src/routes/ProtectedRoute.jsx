
import React from 'react'
import  {Navigate, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux';



function ProtectedRoute() {

const userId = localStorage.getItem("userId")

// const {user, loading} = useSelector(
// (state)=>state.user
// );


// if(!loading){
//     return (
//       <div className="h-screen flex items-center justify-center">
//         Loading...
//       </div>
//     )
// }


if(!userId){
    return <Navigate to='/login' replace />
}

  return (
<Outlet/>
  )
}

export default ProtectedRoute