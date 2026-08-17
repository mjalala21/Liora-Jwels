

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthLayout() {
  const user = useSelector((state) => state.user.user);


  const role = localStorage.getItem("role");



    // Redux user exists

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/admin/dashbord" replace />;
    }

    return <Navigate to="/" replace />;
  }

   // Redux is empty, but localStorage says user is logged in

 
    if (role === "admin") {
      return <Navigate to="/admin/dashbord" replace />;
    }

  

  return <Outlet />;
}

export default AuthLayout;