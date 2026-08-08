// import React, { useState } from 'react'

// function ProductsTable({products}) {

//     const[page, setPage] = useState(1)

//     const itemsPerPage = 10;

//     const totalPage = Math.ceil(products.length/itemsPerPage)

//     const start = (page-1) * itemsPerPage
//     const end = start + itemsPerPage

//     const productsPerPage = products.slice(start, end)


//   return (
//      <div className='border border-red-500'>
//          <table >
//           <thead>
//           <tr>
//                <th>Image</th>
//                <th>Product</th>
//                <th>Category</th>
//                <th>Price</th>
//                <th>Stock</th>
//                <th>Status</th>
//                <th>Action</th>

//           </tr>
//           </thead>
//           <tbody>

//             {productsPerPage.map(product=>

            
//              <tr>

//                <td><img src={product.image} className='w-16 h-16 rounded-xl object-cover'/></td>
//                <td>{product.name}</td>
//                <td>{product.category}</td>
//                <td>{product.price}</td>
//                <td>stock</td>
//                <td>{product.status}</td>
//                <td>
//                 <button>Delete</button>
//                 <button>Edit</button>
//                </td>

//              </tr>
// )}
//           </tbody>

//          </table>

//          <div>
//             <button onClick={()=>setPage(page-1)}>Previous</button>
//             <button onClick={()=>setPage(page+1)} >Next</button>
//          </div>


//       </div>
//   )
// }

// export default ProductsTable

import React, { useState } from "react";
import {
  FaEye,
  FaEdit,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import usePagination from "../../../hooks/usePagination";
import Pagination from "./Pagination";
import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "../../../services/productsApi";
import { useQueryClient } from "@tanstack/react-query";
import ProductView from './ProductView';

function ProductsTable({ products, searchedProducts }) {

    const {page, setPage,  totalPages, currentItems, nextPage, previousPage} = usePagination(searchedProducts, 5)

    const queryClient = useQueryClient()

    const [selectedProduct, setSelectedProduct] = useState(null);

    const permenentDeleteMutation = useMutation({
        mutationFn : deleteProduct,

        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : ['products']
            })
        }
    })
  

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-[#F8F4EC] border-b">

            <tr className="text-left text-[#3B2418]">

              <th className="px-6 py-5">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className="text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {currentItems.map((product) => (

              <tr
                key={product.id}
                className="border-b hover:bg-[#FDFBF8] transition-all"
              >

                {/* Image */}

                <td className="px-6 py-5">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 rounded-2xl object-cover"
                  />

                </td>

                {/* Name */}

                <td className="font-semibold text-[#3B2418]">
                  {product.name}
                </td>

                {/* Category */}

                <td className="text-gray-600">
                  {product.category}
                </td>

                {/* Price */}

                <td className="font-bold text-[#D4AF37]">
                  ₹{product.price.toLocaleString("en-IN")}
                </td>

                {/* Stock */}

                <td>

                  <span>

                    {product.stock}

                  </span>

                </td>

                {/* Status */}

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      product.stock > 10
                        ? "bg-green-100 text-green-700":
                      product.stock >=1 && product.stock<=10 ?
                         "bg-yellow-100 text-yellow-700" :
                       
                         "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock >10 ? "In Stock" :
                    product.stock>=1 && product.stock<=10 ? "Low Stock" :
                          "Out Stock" 
                      }
                  </span>

                </td>

                {/* Actions */}

               <td>
  <div className="flex justify-center items-center gap-3">

    {/* View */}
    <button
      onClick={() => setSelectedProduct(product)}
      className="w-10 h-10 rounded-xl bg-[#F8F4EC] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center"
      title="View Product"
    >
      <FaEye />
    </button>

    {/* Edit */}
    <button
      className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center"
      title="Edit Product"
    >
      <FaEdit />
    </button>

    {/* Delete */}
    <button 

      onClick={()=>permenentDeleteMutation.mutate(product.id)}
      className="w-10 h-10 rounded-xl bg-red-50 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center"
      title="Delete Product"
    >
      <FaTrashAlt />
    </button>

  </div>
</td>
              </tr>

            ))}

          </tbody>

        </table>

        {selectedProduct && (
  <ProductView
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
  />
)}

      </div>

      {/* Pagination */}

      <Pagination page = {page}
                  setPage = {setPage}
                  totalPages={totalPages}
                  currentItems={currentItems}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  
      />



    </div>
  );
}

export default ProductsTable;