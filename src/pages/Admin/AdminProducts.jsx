// import React, { useState } from 'react'
// import { useQuery } from '@tanstack/react-query'
// // import { getProducts } from '../../services/api'
// import { getProducts } from '../../services/productsApi'
// import ProductsTable from './AdminProducts/ProductsTable'

// function AdminProducts() {

// const[page, setPage] = useState(1)




// const {data : products=[], isLoading} = useQuery({
//   queryKey : ['products'],
//   queryFn : getProducts
// })

// if(isLoading){
//   return <h1>Loading...</h1>
// }

//   return (
//     <div className='min-h-screen'>

//       <div className="flex justify-between items-end mb-10">

//   <div>
//     <h1 className="text-5xl font-serif text-[#3B2418] tracking-wide">
//       Products
//     </h1>

//     <p className="mt-2 text-gray-500 text-lg">
//       Manage your jewellery collection
//     </p>
//   </div>

//   <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 mb-10">

//     🔍

//     <input
//         type="text"
//         placeholder="Search products..."
//         className="flex-1 outline-none text-[#3B2418] placeholder:text-gray-400"
//     />

// </div>

//   <button className="bg-[#D4AF37] hover:bg-[#C49B2F] text-[#3B2418] px-6 py-3 rounded-xl font-semibold transition-all shadow-lg">
//     + Add Product
//   </button>

// </div>
      
//       {/* <div className='flex flex-col gap-5'>
//          <h1 className='text-brand-brown font-extrabold text-3xl tracking-wide'>Products</h1>
//          <p className='text-black/50'>Manage your jwellery Collection</p>
//       </div>
      
      
//       <div className=' flex'>
//         <input placeholder='search...' className='w-full border-none focus:ring-none' className='bg-white p-4 rounded-2xl' />
//         <button className='bg-brand-gold p-2 py-2 px-4 rounded-xl font-bold'>+Add New Product</button>
//       </div> */}
//       <div className='flex gap-10'>
//         <div className='bg-brand-cream rounded-xl p-5 '>
//           <p>Total Products</p>
//           <p>{products.length}</p>
//         </div>
//         <div>
//           <p>Available</p>
//           <p>72</p>
//         </div>
//         <div>
//           <p>Out of Stocks</p>
//           <p>13</p>
//         </div>
//         <div>
//           <p>Categories</p>
//           <p>5</p>
//         </div>
//       </div>
//      <ProductsTable products={products}/>
//     </div>
//   )
// }

// export default AdminProducts

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/productsApi";
import ProductsTable from "./components/ProductsTable";
import {
  FaSearch,
  FaPlus,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";
import { MdOutlineInventory2 } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";
import { Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";
import SearchBar from "../../components/layout/SearchBar";

function AdminProducts() {

  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

const {search, setSearch, searchedData : searchedProducts} = useSearch(products, (product)=>product.name || "")

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl text-[#3B2418] font-semibold">
          Loading Products...
        </h1>
      </div>
    );
  }

  const availableProducts = products.filter((p) => p.stock>0).length;
  const outOfStock = products.filter((p) => p.stock===0).length;
  const totalCategories = new Set(products.map((p) => p.category)).size;

  // const searchFilterProducts = products.filter(product=>
  //   product.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="min-h-screen bg-[#F8F4EC] p-8">

      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-5xl font-serif text-[#3B2418] tracking-wide">
            Products
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Manage your luxury jewellery collection
          </p>
        </div>

       <Link to= '/admin/productform'><button className="flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C89F2F] transition-all px-6 py-3 rounded-xl font-semibold text-[#3B2418] shadow-lg">
          <FaPlus />
          Add Product
        </button></Link>
      </div>

      <SearchBar search={search}
                 setSearch={setSearch}
                 
      />

      {/* Search */}
      {/* <div className="bg-white rounded-2xl shadow-lg p-5 flex items-center gap-4 mb-10">

        <FaSearch className="text-gray-400 text-xl" />

        <input
          type="text"
          placeholder="Search products..."
          className="flex-1 outline-none text-[#3B2418] placeholder:text-gray-400"
        />

      </div> */}

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-12">

        {/* Total Products */}

        <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <FaBoxOpen className="text-[#D4AF37] text-2xl" />

          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {products.length}
          </h2>

          <p className="text-gray-500 mt-2">
            Total Products
          </p>

        </div>

        {/* Available */}

        <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <FaCheckCircle className="text-green-500 text-2xl" />

          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {availableProducts}
          </h2>

          <p className="text-gray-500 mt-2">
            Available
          </p>

        </div>

        {/* Out of Stock */}

        <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <MdOutlineInventory2 className="text-red-500 text-2xl" />

          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {outOfStock}
          </h2>

          <p className="text-gray-500 mt-2">
            Out of Stock
          </p>

        </div>

        {/* Categories */}

        <div className="bg-white rounded-3xl p-7 shadow-lg hover:shadow-xl transition-all">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <HiOutlineCollection className="text-[#D4AF37] text-2xl" />

          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {totalCategories}
          </h2>

          <p className="text-gray-500 mt-2">
            Categories
          </p>

        </div>

      </div>

      {/* Filters */}

      <div className="flex flex-wrap gap-4 mb-8">

        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]">

          <option>All Categories</option>
          <option>Ring</option>
          <option>Necklace</option>
          <option>Bracelet</option>
          <option>Earring</option>
          <option>Bangle</option>

        </select>

        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]">

          <option>All Stock</option>
          <option>In Stock</option>
          <option>Out of Stock</option>

        </select>

      </div>

      {/* Products Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <ProductsTable products={products} searchedProducts={searchedProducts} />

      </div>

    </div>
  );
}

export default AdminProducts;