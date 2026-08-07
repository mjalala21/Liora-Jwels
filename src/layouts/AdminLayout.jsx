import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

import AdminNavbar from "../components/layout/AdminNavbar";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8F4EC]">
      
      <Sidebar />
    


      <div className="flex flex-1 flex-col">

        <div className="p-6 pb-0">
          <AdminNavbar />
        </div>

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout; 