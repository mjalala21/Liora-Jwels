
import React, { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";

function EditUser({ user, onSave, onCancel, isSaving }) {

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [status, setStatus] = useState(user.status || "active");
  const [role, setRole] = useState(user.role || "user");


  const handleSubmit = (e) => {

    e.preventDefault();

    onSave({
      ...user,
      name,
      email,
      status,
      role,
    });

  };


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">


        {/* Header */}

        <div className="bg-[#F8F4EC] px-7 py-6 flex justify-between items-center">

          <div>

            <h2 className="text-2xl font-serif text-[#3B2418]">
              Edit User
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update user account information
            </p>

          </div>

          <button
            type="button"
            onClick={onCancel}
            className="w-9 h-9 rounded-full bg-white text-gray-500 hover:bg-[#3B2418] hover:text-white transition"
          >
            ✕
          </button>

        </div>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-7 space-y-5"
        >


          {/* Name */}

          <div>

            <label className="block text-sm font-medium text-[#3B2418] mb-2">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />

          </div>


          {/* Email */}

          <div>

            <label className="block text-sm font-medium text-[#3B2418] mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />

          </div>


          {/* Status */}

          <div>

            <label className="block text-sm font-medium text-[#3B2418] mb-2">
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            >

              <option value="active">
                Active
              </option>

              <option value="blocked">
                Locked
              </option>

            </select>

          </div>


          {/* Role */}

          <div>

            <label className="block text-sm font-medium text-[#3B2418] mb-2">
              Role
            </label>

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            >

              <option value="user">
                Customer
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>


          {/* Buttons */}

          <div className="flex gap-3 pt-3">

            <button
              type="button"
              onClick={onCancel}
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <FaTimes />
              Cancel
            </button>


            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl bg-[#3B2418] text-white hover:bg-[#D4AF37] hover:text-[#3B2418] transition flex items-center justify-center gap-2 disabled:opacity-50"
            >

              <FaSave />

              {isSaving ? "Saving..." : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );
}

export default EditUser;

