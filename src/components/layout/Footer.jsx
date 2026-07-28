import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";

function Footer() {
  return (
    <footer className="bg-brand-brown text-brand-beige mt-20">
      <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h1 className="text-3xl text-brand-gold font-bold">LIORA</h1>
          <p className="mt-4 text-sm leading-7">
            Discover timeless elegance with handcrafted jewelry designed for
            every occasion. Luxury, beauty, and craftsmanship in every piece.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl text-brand-gold font-semibold mb-4">
            Quick Links
          </h2>

          <div className="flex flex-col gap-3">
            <Link to="/">Home</Link>
            <Link to="/products">Collections</Link>
            <Link to="/bestsellers">Best Sellers</Link>
            <Link to="/newin">New Arrivals</Link>
          </div>
        </div>

        {/* Customer Services */}
        <div>
          <h2 className="text-xl text-brand-gold font-semibold mb-4">
            Customer Service
          </h2>

          <div className="flex flex-col gap-3">
            <Link to="/cart">Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/login">My Account</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl text-brand-gold font-semibold mb-4">
            Contact
          </h2>

          <div className="flex items-center gap-3 mb-3">
            <FiMail />
            <span>support@liora.com</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <FiPhone />
            <span>+1 (555) 123-4567</span>
          </div>

          <div className="flex gap-5 text-xl">
            <FaInstagram className="cursor-pointer hover:text-brand-gold transition" />
            <FaFacebookF className="cursor-pointer hover:text-brand-gold transition" />
            <FaPinterestP className="cursor-pointer hover:text-brand-gold transition" />
          </div>
        </div>
      </div>

      <div className="border-t border-brand-gold/30 py-5 text-center text-sm">
        © {new Date().getFullYear()} LIORA. All Rights Reserved.
      </div>
    </footer>
  );
}
export default Footer