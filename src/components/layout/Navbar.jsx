import React from 'react'
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className=' flex justify-between  bg-brand-brown p-4'>
      <div className='flex gap-40'>

      
      <div className='text-brand-gold text-2xl'>LIORA</div>
      <div className='flex gap-20'>
        <Link to = '/'><div className='text-brand-beige font-serif'>Home</div></Link>
        <Link to='/products'><div className='text-brand-beige font-serif'>Collections</div></Link>
        <Link to='/bestsellers'><div className='text-brand-beige font-serif'>Best Sellers</div></Link>
        <Link to='/newin'><div className='text-brand-beige font-serif'>Newin</div></Link>
        
        </div>
      </div>
      <div className='flex gap-20 '>
        <div><input placeholder='search...' className='text-white' /></div>
        <Link to='/login'><div className='text-brand-beige text-xl'><FaRegUser /></div></Link>
        <Link to='/wishlist'><div className='text-brand-beige text-xl'><FaRegHeart /></div></Link>
        <Link to='/cart'><div className='text-brand-beige text-xl'><LuShoppingCart /></div></Link>
      </div>
    </div>
  )
}

export default Navbar