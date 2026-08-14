import React from "react";
import { FaSearch } from "react-icons/fa";

function NoItemsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      
      {/* Icon */}
      {/* <div className="w-16 h-16 rounded-full bg-[#F8F4EC] flex items-center justify-center mb-5">
        <FaSearch className="text-2xl text-[#D4AF37]" />
      </div> */}

      {/* Title */}
      <h2 className="text-xl font-semibold text-[#3B2418]">
        No Matching Data Found
      </h2>

      {/* Description */}
      {/* <p className="text-sm text-gray-500 mt-2 text-center max-w-sm">
        We couldn't find any items matching your search or filter.
        Try changing your search or filter options.
      </p> */}

    </div>
  );
}

export default NoItemsFound;