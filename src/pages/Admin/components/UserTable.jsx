import React,{useState} from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteUserById, getUsers, updateUserById } from "../../../services/userApi";
import usePagination from "../../../hooks/usePagination";
import Pagination from "./Pagination";
import UserView from "./UserView";
import ConfirmMessage from "./ConfirmMessage";
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


function UserTable({users}) {

      const queryClient = useQueryClient()
    const [selectedUser, setSelectedUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [blockUser, setBlockUser] = useState(null)

  const {
    page,
    setPage,
    totalPages,
    currentItems,
    nextPage,
    previousPage,
  } = usePagination(users, 5);


  return (
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



<button onClick={()=>setBlockUser(user)}
    className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition ${
    user.status === "active"
      ? "bg-green-100 text-green-700 hover:bg-green-200"
      : "bg-red-100 text-red-700 hover:bg-red-200"
  }`}
  > {user.status === "active" ? "Active" : "Blocked"}</button>

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

        {blockUser && <ConfirmMessage user={blockUser} setBlockUser={setBlockUser}/>} 

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
  )
}

export default UserTable