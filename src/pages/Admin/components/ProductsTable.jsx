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
 
  FaTrashAlt,
 
    FaUndo,
} from "react-icons/fa";

import usePagination from "../../../hooks/usePagination";
import Pagination from "./Pagination";
import { useMutation } from "@tanstack/react-query";
import { removeProduct,  updateProductStatus,   softDeleteProduct,} from "../../../services/productsApi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";


function ProductsTable({
  products,
  searchedProducts,
  onView,
  onEdit,
}) {

 

    const {page, setPage,  totalPages, currentItems, nextPage, previousPage} = usePagination(searchedProducts, 5)

    const queryClient = useQueryClient()
     const [deleteProduct, setDeleteProduct] = useState(null);


const softDeleteMutation = useMutation({
  mutationFn: (id) =>
    softDeleteProduct(id, {
      active: false,
    }),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });

    toast.success("Product Soft Deleted");
  },

    onError: () => {
    toast.error("Failed to Soft delete");
  },

});
const statusMutation = useMutation({
  mutationFn: ({ id, active }) =>
    updateProductStatus(id, active),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });

     toast.success("Product restored successfully!");
  },
   onError: () => {
    toast.error("Failed to restore product");
  },


  
}); 

    const permanentDeleteMutation = useMutation({
        mutationFn : removeProduct,

        onSuccess : ()=>{
            queryClient.invalidateQueries({
                queryKey : ['products']
            }),

        toast.success("Product permanently deleted!")
        },

        onError : ()=>{
          toast.error("Failed to delete product")
        }
    })
//   const toggleProductMutation = useMutation({
//   mutationFn: ({ id, active }) =>
//     updateProductById(id, {
//       active,
//     }),

//   onSuccess: () => {
//     queryClient.invalidateQueries({
//       queryKey: ["products"],
//     });
//   },
// });

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
              <th>Stock Status</th>
              <th>Product Status</th>
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

                <td>
              <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                   product.active
                        ? "bg-green-100 text-green-700"
                             : "bg-red-100 text-red-700"
                                     }`}
                                 >
                              {product.active ? "Active" : "Inactive"}
                              </span>
                     </td>

                {/* Actions */}

               <td>
  <div className="flex justify-center items-center gap-3">

    {/* View */}
    <button
     onClick={() => onView(product)}
      className="w-10 h-10 rounded-xl bg-[#F8F4EC] hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center"
      title="View Product"
    >
      <FaEye />
    </button>

     {!product.active && (
    <button
      onClick={() =>
        statusMutation.mutate({
          id: product.id,
          active: true,
        })
      }
      className="w-10 h-10 rounded-xl bg-green-50 text-green-600 hover:bg-green-500 hover:text-white transition-all duration-300 flex items-center justify-center"
      title="Restore Product"
    >
      <FaUndo />
    </button>
  )}

    <button
  onClick={() => setDeleteProduct(product)}
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

      </div>

      {/* Pagination */}

      <Pagination page = {page}
                  setPage = {setPage}
                  totalPages={totalPages}
                  currentItems={currentItems}
                  nextPage={nextPage}
                  previousPage={previousPage}
                  
      />
 {deleteProduct && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

    <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl">

      <h2 className="text-xl font-semibold text-[#3B2418]">
        Delete Product
      </h2>

      <p className="text-gray-500 mt-2">
        How would you like to delete{" "}
        <span className="font-semibold">
          {deleteProduct.name}
        </span>
        ?
      </p>

      <div className="mt-6 space-y-3">

        {/* Soft Delete */}

        {deleteProduct.active ?   ( <button
          onClick={() => {
            softDeleteMutation.mutate(deleteProduct.id);
            setDeleteProduct(null);
          }}
          className="w-full py-3 rounded-xl bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
        >
          Soft Delete
        </button>  ) : ( 
          <button onClick = {()=>{
            statusMutation.mutate({
          id: deleteProduct.id,
          active: true,
        })
      setDeleteProduct(null)
    }
        }
        className="w-full py-3 rounded-xl bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition"
        >
           

           Restore Product

          </button>
        ) }
       

        {/* Permanent Delete */}
        <button
          onClick={() => {
            permanentDeleteMutation.mutate(deleteProduct.id);
            setDeleteProduct(null);
          }}
          className="w-full py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
        >
          Permanent Delete
        </button>

        {/* Cancel */}
        <button
          onClick={() => setDeleteProduct(null)}
          className="w-full py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}


    </div>
  );
}

export default ProductsTable;