import React from "react";
import { Link } from "react-router-dom";
import { FaLock, FaArrowLeft } from "react-icons/fa";

function BlockedUser() {
  return (
    <div className="min-h-screen bg-[#F8F4EC] flex items-center justify-center px-6">

      <div className="bg-white rounded-3xl shadow-xl p-10 md:p-14 max-w-lg w-full text-center">

        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-[#F8F4EC] flex items-center justify-center mb-7">
          <FaLock className="text-[#D4AF37] text-3xl" />
        </div>


        {/* Brand */}
        <p className="text-sm tracking-[0.4em] text-[#D4AF37] uppercase mb-4">
          LIORA
        </p>


        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-serif text-[#3B2418]">
          Account Temporarily Blocked
        </h1>


        {/* Message */}
        <p className="text-gray-500 mt-5 leading-relaxed">
          Your account has been temporarily blocked and you cannot
          access your account at this time.
        </p>

        <p className="text-gray-500 mt-3 leading-relaxed">
          If you believe this was a mistake, please contact our
          support team for assistance.
        </p>


        {/* Divider */}
        <div className="flex items-center justify-center gap-3 my-8">
          <span className="w-12 h-px bg-[#D4AF37]" />
          <span className="text-[#D4AF37]">✦</span>
          <span className="w-12 h-px bg-[#D4AF37]" />
        </div>


        {/* Back button */}
        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2
          bg-[#3B2418] text-white
          px-7 py-3 rounded-full
          hover:bg-[#5A3827]
          transition duration-300"
        >
          <FaArrowLeft />
          Back to Login
        </Link>

      </div>

    </div>
  );
}

export default BlockedUser;