
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

import { getAllOrders } from "../../services/ordersApi";
import UserTable from "./components/UserTable";
import NoItemsFound from "./components/NoItemsFound";



function AdminUsers() {

  const queryClient = useQueryClient()

const[roleFilter, setRoleFilter] = useState("All Users")
const[statusFilter, setStatusFilter] = useState("All Status")




  const { data: users = [], isUserLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const {data: orders = [], isOrderLoading} = useQuery({
    queryKey : ['orders'],
    queryFn : getAllOrders
  })

  const onlyUsers = useMemo(()=>{
  return users.filter(user=>user.role!=="admin")
},[users])

  const getUserSearchValue = useCallback((user)=>
    `${user.name}
     ${user.status}
     ${user.email}
  `
  ,[])

  const { search, setSearch, searchedData : searchedUsers } = useSearch(onlyUsers, getUserSearchValue);

  

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



// const onlyUsers = useMemo(()=>{
//   return filteredUsers.filter(user=>user.role!=="admin")
// },[filteredUsers]) 





// const updateStatusMutation = useMutation({
//   mutationFn : updateUserById,

//   onSuccess : ()=>{
//     queryClient.invalidateQueries({
//       queryKey : ['users']
//     })
//   }
// })


  if (isUserLoading || isOrderLoading ) {
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

const customers = users.filter(user=>
  orders.some(order=>order.userId === user.id)

)

const customerUsers = customers.length

//   const handleStatusChange = (user) => {

//   const updatedUser = {
//     ...user,
//     status: user.status === "active"
//       ? "blocked"
//       : "active"
//   };

//   updateStatusMutation.mutate(updatedUser);
// };



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

{filteredUsers.length <=0 ? <NoItemsFound/> : <UserTable users = {filteredUsers}/>}




    </div>
  );
}

export default AdminUsers;


