import React from 'react'
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";


function Navbar() {

  const navItems = [
    {name:"Home", path:"/"},
    {name:"Collections", path:"/products"},
    {name:"Best Sellers", path:"/bestsellers"},
    {name:"Orders", path:"/orders"}
  ];


  return (

    <nav className="
      fixed
      top-0
      left-0
      w-full
      z-50
      px-12
      py-6
      flex
      justify-between
      items-center
    
      backdrop-blur-md
bg-white/10
    ">


      {/* Left Menu */}

      <div className="flex gap-12">

        {
          navItems.map((item,index)=>(

            <Link 
            key={index}
            to={item.path}
            >

              <motion.div

              whileHover={{
                y:-3
              }}

              className="
              text-[#F5E6C8]
              font-serif
              text-sm
              tracking-[0.2em]
              uppercase
              relative
              group
              "

              >

              {item.name}


              {/* underline animation */}

              <span
              className="
              absolute
              left-0
              bottom-[-8px]
              w-0
              h-[1px]
              bg-[#E6C98C]
              group-hover:w-full
              transition-all
              duration-500
              "
              />

              </motion.div>


            </Link>

          ))
        }

      </div>



      {/* Logo */}

      <motion.div

      initial={{
        opacity:0
      }}

      animate={{
        opacity:1
      }}

      transition={{
        duration:1
      }}

      className="
      text-[#E6C98C]
      text-3xl
      font-serif
      tracking-[0.5em]
      "

      >

        LIORA

      </motion.div>




      {/* Right Section */}


      <div className="
      flex
      items-center
      gap-8
      ">


      {/* Search */}

      <div
      className="
      flex
      items-center
      border-b
      border-[#E6C98C]
      pb-1
      "
      >

      <input

      placeholder="Search"

      className="
      bg-transparent
      outline-none
      text-[#F5E6C8]
      placeholder:text-[#F5E6C8]/60
      w-28
      font-serif
      text-sm
      "

      />

      <IoSearch
      className="
      text-[#E6C98C]
      "
      />

      </div>




      {/* Icons */}

      <motion.div
      whileHover={{scale:1.1}}
      >

      <Link to="/login">

      <FaRegUser
      className="
      text-[#F5E6C8]
      text-xl
      hover:text-[#E6C98C]
      transition
      duration-300
      "
      />

      </Link>

      </motion.div>



      <motion.div
      whileHover={{scale:1.1}}
      >

      <Link to="/wishlist">

      <FaRegHeart
      className="
      text-[#F5E6C8]
      text-xl
      hover:text-[#E6C98C]
      transition
      duration-300
      "
      />

      </Link>

      </motion.div>



      <motion.div
      whileHover={{scale:1.1}}
      >

      <Link to="/cart">

      <LuShoppingCart
      className="
      text-[#F5E6C8]
      text-xl
      hover:text-[#E6C98C]
      transition
      duration-300
      "
      />

      </Link>

      </motion.div>


      </div>


    </nav>

  )
}

export default Navbar