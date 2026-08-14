import React from 'react'
import {updateUserById} from "../../../services/userApi"
import { useMutation, useQueryClient } from '@tanstack/react-query'

function ConfirmMessage({user, setBlockUser}) {

const queryClient = useQueryClient()

const updateStatusMutation = useMutation({
  mutationFn : updateUserById,

  onSuccess : ()=>{
    queryClient.invalidateQueries({
      queryKey : ['users']
    })
  }
})


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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">

      {/* Header */}
      <div className="bg-[#F8F4EC] px-7 py-6 text-center">

        <div className="mx-auto w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
          <span className="text-3xl">
            {user.status === "active" ? "🔒" : "🔓"}
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-serif font-semibold text-[#3B2418]">
          {user.status === "active"
            ? "Block User"
            : "Unblock User"}
        </h2>

      </div>

      {/* Content */}
      <div className="px-7 py-6 text-center">

        <p className="text-gray-500 leading-relaxed">
          Are you sure you want to{" "}
          <span className="font-semibold text-[#3B2418]">
            {user.status === "active"
              ? "block"
              : "unblock"}
          </span>{" "}
          <span className="font-semibold text-[#3B2418]">
            {user.name}
          </span>
          ?
        </p>

        <p className="text-sm text-gray-400 mt-2">
          {user.status === "active"
            ? "This user will no longer be able to access their account."
            : "This user will regain access to their account."}
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-7">

          {/* Cancel */}
          <button
            onClick={() => setBlockUser(null)}
            className="flex-1 py-3 rounded-xl border border-gray-200
            text-gray-600 font-semibold
            hover:bg-gray-100 transition-all duration-300"
          >
            Cancel
          </button>

          {/* Confirm */}
          <button
            onClick={() => {
              handleStatusChange(user);
              setBlockUser(null);
            }}
            disabled={updateStatusMutation.isPending}
            className={`flex-1 py-3 rounded-xl font-semibold
            text-white transition-all duration-300
            ${
              user.status === "active"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-[#D4AF37] hover:bg-[#C49F2F] text-[#3B2418]"
            }`}
          >
            {updateStatusMutation.isPending
              ? "Updating..."
              : user.status === "active"
              ? "Block User"
              : "Unblock User"}
          </button>

        </div>

      </div>

    </div>

  </div>
);
}

export default ConfirmMessage