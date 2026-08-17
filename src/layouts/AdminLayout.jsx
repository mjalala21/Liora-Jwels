import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { LuMenu, LuX } from "react-icons/lu";

import Sidebar from "../components/layout/Sidebar";
import AdminNavbar from "../components/layout/AdminNavbar";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F4EC]">

      {/* =================================================
          DESKTOP SIDEBAR
          Only visible on lg screens and above
      ================================================= */}

      <div
        className="
          hidden
          lg:block
          fixed
          left-0
          top-0
          bottom-0
          w-80
          z-40
        "
      >
        <Sidebar />
      </div>

      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =================================================
          MOBILE SIDEBAR
      ================================================= */}

      <div
        className={`
          fixed
          top-0
          left-0
          bottom-0
          w-80
          max-w-[85vw]

          z-50

          lg:hidden

          transition-transform
          duration-300
          ease-in-out

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar />

        {/* CLOSE BUTTON */}

        <button
          onClick={() => setSidebarOpen(false)}
          className="
            absolute
            top-5
            right-5

            w-9
            h-9

            rounded-full

            bg-white/10
            backdrop-blur-sm

            text-white
            text-xl

            flex
            items-center
            justify-center

            hover:bg-white/20

            transition
          "
        >
          <LuX />
        </button>
      </div>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          min-h-screen

          lg:ml-80
        "
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            p-3
            sm:p-4
            lg:p-6
            pb-0
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >

            {/* MOBILE MENU BUTTON */}

            <button
              onClick={() => setSidebarOpen(true)}
              className="
                lg:hidden

                flex-shrink-0

                w-11
                h-11

                rounded-xl

                bg-white

                shadow-sm

                flex
                items-center
                justify-center

                text-brand-brown
                text-2xl

                hover:text-brand-gold

                transition
              "
            >
              <LuMenu />
            </button>

            {/* ADMIN NAVBAR */}

            <div className="flex-1 min-w-0">
              <AdminNavbar />
            </div>

          </div>
        </div>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main
          className="
            p-3
            sm:p-4
            lg:p-6

            overflow-x-hidden
          "
        >
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;

