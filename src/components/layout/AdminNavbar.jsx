import React from "react";
import {
  FaSearch,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { useLocation } from "react-router-dom";

function AdminNavbar() {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Dashboard";
      case "/admin/products":
        return "Products";
      case "/admin/orders":
        return "Orders";
      case "/admin/users":
        return "Users";
      case "/admin/analytics":
        return "Analytics";
      default:
        return "Admin Panel";
    }
  };

  return (
    <header className="sticky top-0 z-20 bg-white shadow-md rounded-2xl px-8 py-5 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-serif text-[#3B2418]">
          {getPageTitle()}
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Welcome back, Admin 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        {/* Search */}
        {/* <div className="hidden md:flex items-center bg-[#F8F4EC] rounded-full px-4 py-2 w-72">

          <FaSearch className="text-gray-500" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-3 w-full text-[#3B2418]"
          />
        </div> */}

        {/* Notification */}
        <button className="relative bg-[#F8F4EC] p-3 rounded-full hover:bg-[#D4AF37]/20 transition">

          <FaBell className="text-[#3B2418] text-xl" />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>

        </button>

        {/* Admin */}
        <div className="flex items-center gap-3">

          <FaUserCircle className="text-5xl text-[#D4AF37]" />

          <div className="hidden md:block">
            <h2 className="font-semibold text-[#3B2418]">
              Admin
            </h2>

            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;