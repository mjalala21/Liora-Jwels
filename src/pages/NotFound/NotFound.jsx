import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaGem } from "react-icons/fa";

function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F4EC] flex items-center justify-center px-6">

      <div className="text-center max-w-2xl">

        {/* 404 */}
        <div className="relative">

          <h1 className="text-[150px] md:text-[200px] leading-none font-serif font-bold text-[#D4AF37] opacity-20">
            404
          </h1>

          <div className="absolute inset-0 flex items-center justify-center">
            <FaGem className="text-[#D4AF37] text-5xl md:text-6xl" />
          </div>

        </div>


        {/* Brand */}
        <p className="text-sm tracking-[0.4em] text-[#D4AF37] uppercase mb-4">
          LIORA
        </p>


        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-serif text-[#3B2418]">
          This page has wandered away
        </h2>


        {/* Description */}
        <p className="text-gray-500 mt-4 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist, may have been moved,
          or the link might be incorrect.
        </p>


        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

          <Link
            to="/"
            className="flex items-center justify-center gap-2
            bg-[#3B2418] text-white px-7 py-3 rounded-full
            hover:bg-[#5A3827] transition duration-300"
          >
            <FaArrowLeft />
            Back to Home
          </Link>


          <Link
            to="/products"
            className="flex items-center justify-center
            border border-[#D4AF37] text-[#3B2418]
            px-7 py-3 rounded-full
            hover:bg-[#D4AF37] hover:text-white
            transition duration-300"
          >
            Explore Collection
          </Link>

        </div>


        {/* Bottom decoration */}
        <div className="flex items-center justify-center gap-3 mt-12">

          <span className="w-16 h-px bg-[#D4AF37]"></span>

          <span className="text-[#D4AF37] text-sm">
            ✦
          </span>

          <span className="w-16 h-px bg-[#D4AF37]"></span>

        </div>

      </div>

    </div>
  );
}

export default NotFound;