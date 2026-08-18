
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addProducts } from "../../../services/productsApi";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
function AddProduct() {



  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    material: "",
    stock: 0,
    image: "",
    description: "",
    active : true,
    inStock: true,
  });

  const queryClient = useQueryClient()

  const addProductMutation = useMutation({
    mutationFn : addProducts, 

    onSuccess : ()=>{
       queryClient.invalidateQueries({
        queryKey : ['products']
       })
       
      navigate('/admin/adminproducts')

      toast.success("product added successfully")
    },

    onError : ()=>{
      toast.error("Adding product Failed")
    }
  })

  const navigate= useNavigate()

const handleChange = (e) => {
  const { name, value } = e.target;

  setProduct((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  
const handleSubmit = (e) => {
  e.preventDefault();

  const stock = Number(product.stock);

  const finalProduct = {
    ...product,
    stock,
    inStock: stock > 0,
    active: stock > 0,
  };

  console.log(finalProduct);

  addProductMutation.mutate(finalProduct);
};
   const handleCancel=()=>{
    navigate('/admin/adminproducts')
   }
   

  return (
    <div className="min-h-screen bg-[#F8F4EC] p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-5xl font-serif text-[#3B2418] tracking-wide">
          Add Product
        </h1>

        <p className="text-gray-500 mt-2">
          Add a new jewellery piece to your LIORA collection
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl"
      >

        {/* Product Information */}
        <div className="mb-10">

          <h2 className="text-2xl font-serif text-[#3B2418] mb-6">
            Product Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-[#3B2418] font-medium">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Example: Royal Diamond Ring"
                className="w-full border border-gray-200 rounded-xl p-4 outline-none
                focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 text-[#3B2418] font-medium">
                Category
              </label>

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl p-4 bg-white outline-none
                focus:ring-2 focus:ring-[#D4AF37]"
              >
                <option value="">Select Category</option>
                <option value="Ring">Ring</option>
                <option value="Necklace">Necklace</option>
                <option value="Bracelet">Bracelet</option>
                <option value="Earring">Earring</option>
                <option value="Bangle">Bangle</option>
              </select>
            </div>

            {/* Material */}
            <div>
              <label className="block mb-2 text-[#3B2418] font-medium">
                Material
              </label>

              <input
                type="text"
                name="material"
                value={product.material}
                onChange={handleChange}
                placeholder="Example: 18K Gold"
                className="w-full border border-gray-200 rounded-xl p-4 outline-none
                focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-2 text-[#3B2418] font-medium">
                Selling Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-500">
                  ₹
                </span>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="2999"
                  className="w-full border border-gray-200 rounded-xl p-4 pl-9 outline-none
                  focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            {/* Original Price */}
            <div>
              <label className="block mb-2 text-[#3B2418] font-medium">
                Original Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-500">
                  ₹
                </span>

                <input
                  type="number"
                  name="originalPrice"
                  value={product.originalPrice}
                  onChange={handleChange}
                  placeholder="3499"
                  className="w-full border border-gray-200 rounded-xl p-4 pl-9 outline-none
                  focus:ring-2 focus:ring-[#D4AF37]"
                />
              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="block mb-2 text-[#3B2418] font-medium">
                Stock Quantity
              </label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="25"
                className="w-full border border-gray-200 rounded-xl p-4 outline-none
                focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block mb-2 text-[#3B2418] font-medium">
                Product Image URL
              </label>

              <input
                type="text"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="/images/rings/ring1.jpg"
                className="w-full border border-gray-200 rounded-xl p-4 outline-none
                focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

          </div>
        </div>

        {/* Description */}
        <div className="mb-10">

          <h2 className="text-2xl font-serif text-[#3B2418] mb-6">
            Product Description
          </h2>

          <textarea
            rows="6"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Describe the jewellery piece, material, design, craftsmanship..."
            className="w-full border border-gray-200 rounded-xl p-4 outline-none
            resize-none focus:ring-2 focus:ring-[#D4AF37]"
          />

        </div>

        {/* Product Status */}
        {/* <div className="mb-10">

          <h2 className="text-2xl font-serif text-[#3B2418] mb-6">
            Product Status
          </h2>

          <div className="bg-[#F8F4EC] rounded-2xl p-5">

            {/* <label className="flex items-center gap-3 cursor-pointer">

              <input
                type="checkbox"
                name="inStock"
                checked={product.inStock}
                onChange={handleChange}
                className="w-5 h-5 accent-[#D4AF37]"
              />

              <div>
                <p className="font-semibold text-[#3B2418]">
                  In Stock
                </p>

                <p className="text-sm text-gray-500">
                  Product is currently available for customers
                </p>
              </div>

            </label> */}

          {/* </div>

        </div> */} 

        {/* Product Status */}
<div className="mb-10">

  <h2 className="text-2xl font-serif text-[#3B2418] mb-6">
    Product Status
  </h2>

  <div className="bg-[#F8F4EC] rounded-2xl p-5">

    <div className="flex items-center justify-between">

      <div>
        <p className="font-semibold text-[#3B2418]">
          Stock Status
        </p>

        <p className="text-sm text-gray-500">
          This is automatically calculated from the stock quantity.
        </p>
      </div>

      <span
        className={`px-4 py-2 rounded-full text-sm font-medium ${
          Number(product.stock) > 10
            ? "bg-green-100 text-green-700"
            : Number(product.stock) > 0
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {Number(product.stock) > 10
          ? "In Stock"
          : Number(product.stock) > 0
          ? "Low Stock"
          : "Out of Stock"}
      </span>

    </div>

  </div>

</div>

        {/* Form Buttons */}
        <div className="flex justify-end gap-4 border-t pt-8">

          <button
          onClick={handleCancel}
            type="button"
            className="px-7 py-3 rounded-xl border border-gray-300
            text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button

          onClick={handleSubmit}
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#D4AF37]
            hover:bg-[#C89F2F] text-[#3B2418]
            font-semibold shadow-lg transition"
          >
            Add Product
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddProduct;


// import React from "react";
// import {
//   FaTimes,
//   FaSave,
//   FaGem,
// } from "react-icons/fa";

// function ProductForm({
//   product,
//   setProduct,
//   onSubmit,
//   onCancel,
//   submitText = "Save Product",
//   isSaving = false,
// }) {

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setProduct((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

//       {/* Background */}
//       <div
//         onClick={onCancel}
//         className="
//           absolute inset-0
//           bg-black/50
//           backdrop-blur-sm
//         "
//       />

//       {/* Form Box */}
//       <div
//         className="
//           relative z-10
//           w-full max-w-2xl
//           max-h-[90vh]
//           overflow-y-auto
//           bg-[#F8F4EC]
//           rounded-3xl
//           shadow-2xl
//         "
//       >

//         {/* Header */}
//         <div
//           className="
//             sticky top-0 z-10
//             bg-white
//             border-b
//             px-7 py-5
//             flex items-center justify-between
//           "
//         >

//           <div>
//             <p className="text-sm text-gray-500">
//               Product Management
//             </p>

//             <h2 className="text-2xl font-serif text-[#3B2418]">
//               {submitText === "Add Product"
//                 ? "Add Product"
//                 : "Edit Product"}
//             </h2>
//           </div>

//           <button
//             type="button"
//             onClick={onCancel}
//             disabled={isSaving}
//             className="
//               w-10 h-10
//               rounded-full
//               bg-[#F8F4EC]
//               flex items-center justify-center
//               hover:bg-[#D4AF37]
//               hover:text-white
//               transition
//             "
//           >
//             <FaTimes />
//           </button>

//         </div>

//         {/* Form */}
//         <form
//           onSubmit={onSubmit}
//           className="p-7 space-y-6"
//         >

//           {/* ================= IMAGE ================= */}

//           <div className="bg-white rounded-2xl p-4">

//             <div className="flex items-center gap-5">

//               {product.image ? (

//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="
//                     w-24 h-24
//                     rounded-2xl
//                     object-cover
//                   "
//                 />

//               ) : (

//                 <div
//                   className="
//                     w-24 h-24
//                     rounded-2xl
//                     bg-[#F8F4EC]
//                     flex items-center justify-center
//                   "
//                 >
//                   <FaGem className="text-3xl text-[#D4AF37]" />
//                 </div>

//               )}

//               <div className="flex-1">

//                 <label
//                   className="
//                     block
//                     text-sm
//                     font-medium
//                     text-[#3B2418]
//                     mb-2
//                   "
//                 >
//                   Image URL
//                 </label>

//                 <input
//                   type="text"
//                   name="image"
//                   value={product.image}
//                   onChange={handleChange}
//                   className="
//                     w-full
//                     border
//                     border-gray-200
//                     rounded-xl
//                     px-4 py-3
//                     outline-none
//                     focus:border-[#D4AF37]
//                   "
//                   placeholder="Enter image URL"
//                 />

//               </div>

//             </div>

//           </div>

//           {/* ================= NAME ================= */}

//           <div>

//             <label
//               className="
//                 block
//                 text-sm
//                 font-medium
//                 text-[#3B2418]
//                 mb-2
//               "
//             >
//               Product Name
//             </label>

//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={handleChange}
//               required
//               className="
//                 w-full
//                 bg-white
//                 border
//                 border-gray-200
//                 rounded-xl
//                 px-4 py-3
//                 outline-none
//                 focus:border-[#D4AF37]
//               "
//             />

//           </div>

//           {/* ================= CATEGORY + MATERIAL ================= */}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//             <div>

//               <label
//                 className="
//                   block
//                   text-sm
//                   font-medium
//                   text-[#3B2418]
//                   mb-2
//                 "
//               >
//                 Category
//               </label>

//               <select
//                 name="category"
//                 value={product.category}
//                 onChange={handleChange}
//                 required
//                 className="
//                   w-full
//                   bg-white
//                   border
//                   border-gray-200
//                   rounded-xl
//                   px-4 py-3
//                   outline-none
//                   focus:border-[#D4AF37]
//                 "
//               >

//                 <option value="">
//                   Select Category
//                 </option>

//                 <option value="Ring">
//                   Ring
//                 </option>

//                 <option value="Necklace">
//                   Necklace
//                 </option>

//                 <option value="Bracelet">
//                   Bracelet
//                 </option>

//                 <option value="Earing">
//                   Earring
//                 </option>

//                 <option value="Bangle">
//                   Bangle
//                 </option>

//               </select>

//             </div>

//             <div>

//               <label
//                 className="
//                   block
//                   text-sm
//                   font-medium
//                   text-[#3B2418]
//                   mb-2
//                 "
//               >
//                 Material
//               </label>

//               <input
//                 type="text"
//                 name="material"
//                 value={product.material}
//                 onChange={handleChange}
//                 className="
//                   w-full
//                   bg-white
//                   border
//                   border-gray-200
//                   rounded-xl
//                   px-4 py-3
//                   outline-none
//                   focus:border-[#D4AF37]
//                 "
//               />

//             </div>

//           </div>

//           {/* ================= PRICE ================= */}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//             <div>

//               <label
//                 className="
//                   block
//                   text-sm
//                   font-medium
//                   text-[#3B2418]
//                   mb-2
//                 "
//               >
//                 Price
//               </label>

//               <input
//                 type="number"
//                 name="price"
//                 value={product.price}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 className="
//                   w-full
//                   bg-white
//                   border
//                   border-gray-200
//                   rounded-xl
//                   px-4 py-3
//                   outline-none
//                   focus:border-[#D4AF37]
//                 "
//               />

//             </div>

//             <div>

//               <label
//                 className="
//                   block
//                   text-sm
//                   font-medium
//                   text-[#3B2418]
//                   mb-2
//                 "
//               >
//                 Original Price
//               </label>

//               <input
//                 type="number"
//                 name="originalPrice"
//                 value={product.originalPrice}
//                 onChange={handleChange}
//                 min="0"
//                 className="
//                   w-full
//                   bg-white
//                   border
//                   border-gray-200
//                   rounded-xl
//                   px-4 py-3
//                   outline-none
//                   focus:border-[#D4AF37]
//                 "
//               />

//             </div>

//           </div>

//           {/* ================= STOCK ================= */}

//           <div>

//             <label
//               className="
//                 block
//                 text-sm
//                 font-medium
//                 text-[#3B2418]
//                 mb-2
//               "
//             >
//               Stock
//             </label>

//             <input
//               type="number"
//               name="stock"
//               value={product.stock}
//               onChange={handleChange}
//               required
//               min="0"
//               className="
//                 w-full
//                 bg-white
//                 border
//                 border-gray-200
//                 rounded-xl
//                 px-4 py-3
//                 outline-none
//                 focus:border-[#D4AF37]
//               "
//             />

//           </div>

//           {/* ================= DESCRIPTION ================= */}

//           <div>

//             <label
//               className="
//                 block
//                 text-sm
//                 font-medium
//                 text-[#3B2418]
//                 mb-2
//               "
//             >
//               Description
//             </label>

//             <textarea
//               name="description"
//               value={product.description}
//               onChange={handleChange}
//               rows="5"
//               className="
//                 w-full
//                 bg-white
//                 border
//                 border-gray-200
//                 rounded-xl
//                 px-4 py-3
//                 outline-none
//                 focus:border-[#D4AF37]
//                 resize-none
//               "
//             />

//           </div>

//           {/* ================= STOCK STATUS ================= */}

//           <div
//             className="
//               bg-white
//               rounded-2xl
//               p-5
//               flex
//               items-center
//               justify-between
//             "
//           >

//             <div>

//               <p className="font-medium text-[#3B2418]">
//                 Product Status
//               </p>

//               <p className="text-sm text-gray-500">
//                 Automatically controlled by stock
//               </p>

//             </div>

//             <span
//               className={`
//                 px-4 py-2
//                 rounded-full
//                 text-sm
//                 font-medium
//                 ${
//                   Number(product.stock) > 0
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-600"
//                 }
//               `}
//             >
//               {Number(product.stock) > 0
//                 ? "In Stock"
//                 : "Out of Stock"}
//             </span>

//           </div>

//           {/* ================= BUTTONS ================= */}

//           <div className="flex gap-4 pt-2">

//             <button
//               type="button"
//               onClick={onCancel}
//               disabled={isSaving}
//               className="
//                 flex-1
//                 py-3
//                 rounded-xl
//                 bg-white
//                 border
//                 border-gray-200
//                 text-gray-600
//                 hover:bg-gray-100
//                 transition
//                 font-medium
//               "
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={isSaving}
//               className="
//                 flex-1
//                 py-3
//                 rounded-xl
//                 bg-[#3B2418]
//                 text-white
//                 hover:bg-[#D4AF37]
//                 hover:text-[#3B2418]
//                 transition
//                 font-medium
//                 flex
//                 items-center
//                 justify-center
//                 gap-2
//                 disabled:opacity-50
//               "
//             >

//               <FaSave />

//               {isSaving
//                 ? "Saving..."
//                 : submitText}

//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// }

// export default ProductForm;
