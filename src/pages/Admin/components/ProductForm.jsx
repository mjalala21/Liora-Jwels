
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addProducts } from "../../../services/productsApi";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    originalPrice: "",
    material: "",
    stock: "",
    image: "",
    description: "",
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
    }
  })

  const navigate= useNavigate()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(product);

   addProductMutation.mutate(product)

   
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
        <div className="mb-10">

          <h2 className="text-2xl font-serif text-[#3B2418] mb-6">
            Product Status
          </h2>

          <div className="bg-[#F8F4EC] rounded-2xl p-5">

            <label className="flex items-center gap-3 cursor-pointer">

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

            </label>

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

