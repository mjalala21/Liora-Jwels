// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom'
// import { useSelector } from 'react-redux';

// function AuthLayout() {

//  const user = useSelector((state) => state.user.user);

//   if(user){
//       return <Navigate to='/' replace />
//   }
//   return (
//     <div>
//         <Outlet/>
//     </div>
//   )
// }

// export default AuthLayout


import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout() {
  const user = useSelector((state) => state.user.user);

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashbord" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AuthLayout;