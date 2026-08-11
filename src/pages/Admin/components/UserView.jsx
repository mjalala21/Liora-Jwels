
import React from "react";
import { FaEdit } from "react-icons/fa";

function UserView({ user, onClose, onEdit }) {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-[#F8F4EC] px-7 py-6 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-serif text-[#3B2418]">
              User Details
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Account information
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white text-gray-500 hover:bg-[#3B2418] hover:text-white transition"
          >
            ✕
          </button>

        </div>


        {/* User Profile */}

        <div className="p-7">

          <div className="flex flex-col items-center mb-7">

            {user.avatar ? (

              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-[#F8F4EC]"
              />

            ) : (

              <div className="w-24 h-24 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#3B2418] text-3xl font-bold">
                {user.name?.charAt(0).toUpperCase()}
              </div>

            )}

            <h3 className="text-2xl font-semibold text-[#3B2418] mt-4">
              {user.name}
            </h3>

            <p className="text-gray-500">
              {user.email}
            </p>

          </div>


          {/* Details */}

          <div className="space-y-4">

            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-gray-500">
                User ID
              </span>

              <span className="text-[#3B2418] font-medium">
                {user.id}
              </span>
            </div>


            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-gray-500">
                Email
              </span>

              <span className="text-[#3B2418] font-medium">
                {user.email}
              </span>
            </div>


            {/* <div className="flex justify-between items-center border-b pb-4">
              <span className="text-gray-500">
                Role
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user.role}
              </span>
            </div> */}


            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-gray-500">
                Status
              </span>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user.status || "active"}
              </span>
            </div>


            <div className="flex justify-between items-center">
              <span className="text-gray-500">
                Joined
              </span>

              <span className="text-[#3B2418] font-medium">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Not available"}
              </span>
            </div>

          </div>


          {/* Close */}

          <button
            onClick={onClose}
            className="w-full mt-7 bg-[#3B2418] text-white py-3 rounded-xl hover:bg-[#D4AF37] hover:text-[#3B2418] transition-all duration-300 font-medium"
          >
            Close
          </button>
          {/* <div className="flex gap-3 mt-7">

  <button
    onClick={() => onEdit(user)}
    className="flex-1 bg-[#3B2418] text-white py-3 rounded-xl hover:bg-[#D4AF37] hover:text-[#3B2418] transition-all duration-300 font-medium flex items-center justify-center gap-2"
  >
    <FaEdit />
    Edit User
  </button>

  <button
    onClick={onClose}
    className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium"
  >
    Close
  </button>

</div> */}

        </div>

      </div>

    </div>
  );
}

export default UserView;

