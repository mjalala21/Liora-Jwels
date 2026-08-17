import React from 'react'
import {FaSearch} from "react-icons/fa";

function SearchBar({search, setSearch}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 mb-10">
   
           <FaSearch className="text-gray-400 text-xl" />
   
           <input 


             value={search}
             onChange={(e)=>setSearch(e.target.value)}
             type="text"
             placeholder="Search..."
             className="flex-1 outline-none text-[#3B2418] placeholder:text-gray-400"
           />
   
         </div>
  )
}

export default SearchBar