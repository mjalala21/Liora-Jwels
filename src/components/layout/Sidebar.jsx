// import React from "react";
// import {
//   FaChartPie,
//   FaBoxOpen,
//   FaShoppingBag,
//   FaUsers,
//   FaChartLine,
//   FaSignOutAlt,
//   FaGem,
// } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { clearUser } from "../../redux/slices/UserSlice";
// import { useNavigate } from "react-router-dom";

// function Sidebar() {
//   const menuItems = [
//     {
//       name: "Dashboard",
//       path: "/admin/dashbord",
//       icon: <FaChartPie />,
//     },
//     {
//       name: "Products",
//       path: "/admin/adminproducts",
//       icon: <FaBoxOpen />,
//     },
//     {
//       name: "Orders",
//       path: "/admin/adminorders",
//       icon: <FaShoppingBag />,
//     },
//     {
//       name: "Users",
//       path: "/admin/users",
//       icon: <FaUsers />,
//     },
//     {
//       name: "Analytics",
//       path: "/admin/adminanalytics",
//       icon: <FaChartLine />,
//     },
//   ];

//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   function handleLogout(){
//     localStorage.removeItem("role")
//     dispatch(clearUser())
//     navigate('/login')
//   }

//   return (
//     <aside className="w-80 min-h-screen bg-[#3B2418] text-brand-beige flex flex-col justify-between shadow-xl">

//       {/* Logo */}
//       <div>

//         <div className="flex items-center gap-3 px-8 py-8 border-b border-white/10">
//           <FaGem className="text-[#D4AF37] text-3xl" />

//           <div>
//             <h1 className="text-2xl font-serif tracking-widest">
//               LIORA
//             </h1>

//             <p className="text-xs text-gray-300 font-sans">
//               Admin Panel
//             </p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="mt-8 px-4">

//           {menuItems.map((item) => (
//             <NavLink
//               key={item.name}
//               to={item.path}
//               className={({ isActive }) =>
//                 `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition-all duration-300 text-xl
//                 ${
//                   isActive
//                     ? "bg-[#D4AF37] text-[#3B2418] font-semibold shadow-md"
//                     : "hover:bg-[#4E3325] hover:text-[#D4AF37]"
//                 }`
//               }
//             >
//               <span className="text-xl">{item.icon}</span>
//               <span>{item.name}</span>
//             </NavLink>
//           ))}

//         </nav>
//       </div>

//       {/* Logout */}
//       <div className="p-4 border-t border-white/10">
//         <button className="w-full flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-red-500 transition"
//         onClick={handleLogout}
//         >
//           <FaSignOutAlt />
//           Logout
//         </button>
//       </div>

//     </aside>
//   );
// }

// export default Sidebar;

import React from "react";
import {
  FaChartPie,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaChartLine,
  FaSignOutAlt,
  FaGem,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../redux/slices/UserSlice";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashbord",
      icon: <FaChartPie />,
    },
    {
      name: "Products",
      path: "/admin/adminproducts",
      icon: <FaBoxOpen />,
    },
    {
      name: "Orders",
      path: "/admin/adminorders",
      icon: <FaShoppingBag />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <FaUsers />,
    },
    {
      name: "Analytics",
      path: "/admin/adminanalytics",
      icon: <FaChartLine />,
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    localStorage.removeItem("role");
    dispatch(clearUser());
    navigate("/login");
  }

  return (
    <aside
      className="
        w-80
        h-full
        bg-[#3B2418]
        text-brand-beige
        flex
        flex-col
        justify-between
        shadow-xl
      "
    >
      {/* =========================
          LOGO
      ========================== */}

      <div>
        <div
          className="
            flex
            items-center
            gap-3
            px-8
            py-8
            border-b
            border-white/10
          "
        >
          <FaGem className="text-[#D4AF37] text-3xl" />

          <div>
            <h1
              className="
                text-2xl
                font-serif
                tracking-widest
              "
            >
              LIORA
            </h1>

            <p className="text-xs text-gray-300 font-sans">
              Admin Panel
            </p>
          </div>
        </div>

        {/* =========================
            NAVIGATION
        ========================== */}

        <nav className="mt-8 px-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-xl
                mb-3
                transition-all
                duration-300
                text-xl

                ${
                  isActive
                    ? "bg-[#D4AF37] text-[#3B2418] font-semibold shadow-md"
                    : "hover:bg-[#4E3325] hover:text-[#D4AF37]"
                }
                `
              }
            >
              <span className="text-xl">
                {item.icon}
              </span>

              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* =========================
          LOGOUT
      ========================== */}

      <div className="p-4 border-t border-white/10">
        <button
          className="
            w-full
            flex
            items-center
            gap-4
            px-5
            py-4
            rounded-xl
            hover:bg-red-500
            transition
          "
          onClick={handleLogout}
        >
          <FaSignOutAlt />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;