
import React,{useState, useMemo, useCallback} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaUsers,
  FaUserCheck,
  FaUserShield,
  FaLock,
  FaUserPlus,
  FaEye,
  FaUserLock,
  FaEdit,
  FaTrashAlt,
  FaSearch,
} from "react-icons/fa";

import { deleteUserById, getUsers, updateUserById } from "../../services/userApi";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";
import Pagination from "./components/Pagination";
import UserView from "./components/UserView";


function AdminUsers() {

  const queryClient = useQueryClient()

const[roleFilter, setRoleFilter] = useState("All Users")
const[statusFilter, setStatusFilter] = useState("All Status")

const [selectedUser, setSelectedUser] = useState(null);
const [editingUser, setEditingUser] = useState(null);


  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const getUserSearchValue = useCallback((user)=>
    `${user.name}
     ${user.status}
     ${user.email}
  `
  ,[])

  const { search, setSearch, searchedData : searchedUsers } = useSearch(users, getUserSearchValue);

  

//   const roleFilteredUsers =useMemo(()=>{
//    return searchedUsers.filter(user=>
//     roleFilter==="All Users" || 
//    ( user.role==="admin"&& roleFilter === "Admin") ||
//    (user.role === "user" && roleFilter === "Customer")
//   )
// },[roleFilter, searchedUsers])
  const filteredUsers = useMemo(()=>{
  return searchedUsers.filter(user=>
      statusFilter=== "All Status" ||
      (user.status === "active" && statusFilter === "Active") ||
      (user.status === "blocked" && statusFilter === "Blocked")
  )
},[searchedUsers, statusFilter])

const onlyUsers = useMemo(()=>{
  return filteredUsers.filter(user=>user.role!=="admin")
},[filteredUsers]) 

  const {
    page,
    setPage,
    totalPages,
    currentItems,
    nextPage,
    previousPage,
  } = usePagination(onlyUsers, 5);


const updateStatusMutation = useMutation({
  mutationFn : updateUserById,

  onSuccess : ()=>{
    queryClient.invalidateQueries({
      queryKey : ['users']
    })
  }
})


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-[#3B2418] font-semibold">
          Loading Users...
        </h1>
      </div>
    );
  }

  const totalUsers = onlyUsers.length;

  const activeUsers = users.filter(
    (user) => user.status === "active"
  ).length;

  const blockedUsers = users.filter(
    (user) => user.status === "blocked"
  ).length;

  const customerUsers = users.filter(
    (user) => user.role === "user"
  ).length;

  const handleStatusChange = (user) => {

  const updatedUser = {
    ...user,
    status: user.status === "active"
      ? "blocked"
      : "active"
  };

  updateStatusMutation.mutate(updatedUser);
};



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


        {/* Blocked*/}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
                <FaUserLock className="text-red-500 text-2xl" />
             </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {blockedUsers}
          </h2>

          <p className="text-gray-500 mt-2">
            Blocked Users
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




        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]"
        onChange={(e)=>setStatusFilter(e.target.value)}
        >

          <option value = "All Status">All Status</option>
          <option value = "Active">Active</option>
          <option value = "Blocked">Blocked</option>

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

                {/* <th>
                  Role
                </th> */}

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

              {currentItems.map((user) => (

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


                  


                  {/* Status */}

                  <td>

                    <button
  onClick={() => handleStatusChange(user)}
  disabled={updateStatusMutation.isPending}
  className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition ${
    user.status === "active"
      ? "bg-green-100 text-green-700 hover:bg-green-200"
      : "bg-red-100 text-red-700 hover:bg-red-200"
  }`}
>
  {user.status === "active" ? "Active" : "Blocked"}
</button>

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
  onClick={() => setSelectedUser(user)}
  className="w-10 h-10 rounded-xl bg-[#F8F4EC] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center"
  title="View User"
>
  <FaEye />
</button>


        

                  


                      {/* Delete */}

                    
                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* user View  */}

        {selectedUser && (
  <UserView
    user={selectedUser}
    onClose={() => setSelectedUser(null)}
  />
)}


        {/* Pagination */}

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          currentItems={currentItems}
          nextPage={nextPage}
          previousPage={previousPage}
        />

      </div>

    </div>
  );
}

export default AdminUsers;


