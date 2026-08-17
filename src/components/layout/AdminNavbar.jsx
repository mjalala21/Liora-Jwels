import React from "react";
import {
  FaUserCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";

function AdminNavbar() {

  const user = useSelector((state) => state.user.user);

  return (
    <header
      className="
        sticky
        top-0
        z-20

        bg-white
        shadow-md
        rounded-2xl

        px-4
        sm:px-6
        lg:px-8

        py-4
        sm:py-5

        flex
        items-center
        justify-between 
         gap-4
      "
    >

      {/* =========================
          LEFT
      ========================== */}

      <div className="min-w-0">

        <h1
          className="
            text-xl
            sm:text-2xl
            lg:text-3xl

            font-serif
            text-[#3B2418]

           
          "
        >
          Admin Panel
        </h1>

        <p
          className="
            text-gray-500

            text-xs
            sm:text-sm

            mt-1

            
          "
        >
          Welcome back, {user?.name || "Admin"} 👋
        </p>

      </div>


      {/* =========================
          RIGHT
      ========================== */}

      <div className="flex items-center flex-shrink-0">

        {/* Admin */}

        <div className="flex items-center gap-2 sm:gap-3">

          <FaUserCircle
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl

              text-[#D4AF37]
            "
          />

          <div className="hidden sm:block">

            <h2
              className="
                font-semibold
                text-[#3B2418]

                text-sm
                lg:text-base
              "
            >
              {user?.name || "Admin"}
            </h2>

            <p
              className="
                text-xs
                lg:text-sm

                text-gray-500
              "
            >
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;