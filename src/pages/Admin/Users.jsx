
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaUsers,
  FaUserCheck,
  FaUserShield,
  FaUserPlus,
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaSearch,
} from "react-icons/fa";

import { getUsers } from "../../services/userApi";
// import useSearch from "../../hooks/useSearch";
// import usePagination from "../../hooks/usePagination";
// import Pagination from "./components/Pagination";

function AdminUsers() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const { search, setSearch, searchedData } = useSearch(users, "name");

//   const {
//     page,
//     setPage,
//     totalPages,
//     currentItems,
//     nextPage,
//     previousPage,
//   } = usePagination(searchedData, 5);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-[#3B2418] font-semibold">
          Loading Users...
        </h1>
      </div>
    );
  }

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "active"
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === "admin"
  ).length;

  const customerUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  return (
    <div className="min-h-screen bg-[#F8F4EC] p-8">

      {/* Header */}

      <div className="mb-10">
        <h1 className="text-5xl font-serif text-[#3B2418] tracking-wide">
          Users
        </h1>

        <p className="mt-3 text-gray-500 text-lg">
          Manage your LIORA customers and admin accounts
        </p>
      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-10">

        {/* Total Users */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">
            <FaUsers className="text-[#D4AF37] text-2xl" />
          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {totalUsers}
          </h2>

          <p className="text-gray-500 mt-2">
            Total Users
          </p>

        </div>


        {/* Active Users */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
            <FaUserCheck className="text-green-500 text-2xl" />
          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {activeUsers}
          </h2>

          <p className="text-gray-500 mt-2">
            Active Users
          </p>

        </div>


        {/* Admins */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center">
            <FaUserShield className="text-purple-500 text-2xl" />
          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {adminUsers}
          </h2>

          <p className="text-gray-500 mt-2">
            Administrators
          </p>

        </div>


        {/* Customers */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
            <FaUserPlus className="text-blue-500 text-2xl" />
          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {customerUsers}
          </h2>

          <p className="text-gray-500 mt-2">
            Customers
          </p>

        </div>

      </div>


      {/* Search */}

      <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 mb-8">

        <FaSearch className="text-gray-400 text-xl" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="flex-1 outline-none text-[#3B2418] placeholder:text-gray-400"
        />

      </div>


      {/* Filters */}

      <div className="flex flex-wrap gap-4 mb-8">

        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]">

          <option>All Roles</option>
          <option>Customer</option>
          <option>Admin</option>

        </select>


        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]">

          <option>All Status</option>
          <option>Active</option>
          <option>Blocked</option>

        </select>

      </div>


      {/* Users Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#F8F4EC] border-b">

              <tr className="text-left text-[#3B2418]">

                <th className="px-6 py-5">
                  User
                </th>

                <th>
                  Email
                </th>

                <th>
                  Role
                </th>

                <th>
                  Status
                </th>

                <th>
                  Joined
                </th>

                <th className="text-center">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="border-b hover:bg-[#FDFBF8] transition-all"
                >

                  {/* User */}

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-4">

                      {user.avatar ? (

                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />

                      ) : (

                        <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#3B2418] font-bold">
                          {user.name?.charAt(0)}
                        </div>

                      )}

                      <div>

                        <p className="font-semibold text-[#3B2418]">
                          {user.name}
                        </p>

                        <p className="text-sm text-gray-400">
                          @{user.name}
                        </p>

                      </div>

                    </div>

                  </td>


                  {/* Email */}

                  <td className="text-gray-600">
                    {user.email}
                  </td>


                  {/* Role */}

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {user.role}
                    </span>

                  </td>


                  {/* Status */}

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.status === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status || "active"}
                    </span>

                  </td>


                  {/* Created */}

                  <td className="text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                               day: "2-digit",
                               month: "short",
                                year: "numeric"
                                             })}
                  </td>


                  {/* Actions */}

                  <td>

                    <div className="flex justify-center items-center gap-3">

                      {/* View */}

                      <button
                        className="w-10 h-10 rounded-xl bg-[#F8F4EC] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center"
                        title="View User"
                      >
                        <FaEye />
                      </button>


                      {/* Edit */}

                      <button
                        className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                        title="Edit User"
                      >
                        <FaEdit />
                      </button>


                      {/* Delete */}

                      <button
                        className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
                        title="Delete User"
                      >
                        <FaTrashAlt />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* Pagination */}
{/* 
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          currentItems={currentItems}
          nextPage={nextPage}
          previousPage={previousPage}
        /> */}

      </div>

    </div>
  );
}

export default AdminUsers;

