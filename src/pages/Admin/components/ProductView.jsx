import React from "react";
import {
  FaTimes,
  FaGem,
  FaEdit,
} from "react-icons/fa";

function ProductView({
  product,
  onClose,
  onEdit,
}) {

  return (
   
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">


      {/* Background */}

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />


      {/* Center Modal */}

<div className="relative z-10 w-full max-w-xl max-h-[90vh] bg-[#F8F4EC] rounded-3xl shadow-2xl overflow-y-auto scrollbar-hide">

        {/* Header */}

        <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b bg-white">

          <div>

            <p className="text-sm text-gray-500">
              Product Details
            </p>

            <h2 className="text-2xl font-serif text-[#3B2418]">
              {product.name}
            </h2>

          </div>


          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F8F4EC] flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition"
          >
            <FaTimes />
          </button>

        </div>


        {/* Product Image */}

        <div className="p-6">

          <div className="bg-white rounded-3xl overflow-hidden shadow-lg">

            {product.image ? (

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-72 object-cover"
              />

            ) : (

              <div className="h-72 flex items-center justify-center">

                <FaGem className="text-6xl text-[#D4AF37]" />

              </div>

            )}

          </div>

        </div>


        {/* Details */}

        <div className="px-6 pb-8">

          <div className="bg-white rounded-3xl p-6 shadow-lg">


            <h3 className="text-3xl font-serif text-[#3B2418]">
              {product.name}
            </h3>


            <p className="text-gray-500 mt-2">
              {product.category}
            </p>


            {/* Price */}

            <div className="mt-6 flex items-center gap-4">

              <span className="text-3xl font-bold text-[#D4AF37]">

                ₹{Number(product.price).toLocaleString("en-IN")}

              </span>


              {product.originalPrice && (

                <span className="text-gray-400 line-through">

                  ₹{Number(product.originalPrice).toLocaleString("en-IN")}

                </span>

              )}

            </div>


            {/* Information */}

            <div className="mt-8 space-y-5">


              <div className="flex justify-between border-b pb-4">

                <span className="text-gray-500">
                  Product ID
                </span>

                <span className="font-medium text-[#3B2418]">
                  {product.id}
                </span>

              </div>


              <div className="flex justify-between border-b pb-4">

                <span className="text-gray-500">
                  Category
                </span>

                <span className="font-medium text-[#3B2418]">
                  {product.category}
                </span>

              </div>


              <div className="flex justify-between border-b pb-4">

                <span className="text-gray-500">
                  Material
                </span>

                <span className="font-medium text-[#3B2418]">
                  {product.material}
                </span>

              </div>


              <div className="flex justify-between border-b pb-4">

                <span className="text-gray-500">
                  Stock
                </span>

                <span className="font-medium text-[#3B2418]">
                  {product.stock}
                </span>

              </div>

            </div>


            {/* Status */}

            <div className="mt-6">

              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  product.stock > 10
                    ? "bg-green-100 text-green-700"
                    : product.stock > 0
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >

                {product.stock > 10
                  ? "In Stock"
                  : product.stock > 0
                  ? "Low Stock"
                  : "Out of Stock"}

              </span>

            </div>


            {/* Description */}

            <div className="mt-8">

              <h4 className="text-xl font-serif text-[#3B2418] mb-3">
                Description
              </h4>

              <p className="text-gray-600 leading-7">
                {product.description ||
                  "No description available."}
              </p>

            </div>


            {/* Edit Button */}

            <button
              onClick={() => onEdit(product)}
              className="w-full mt-8 bg-[#3B2418] text-white py-3 rounded-xl hover:bg-[#D4AF37] hover:text-[#3B2418] transition flex items-center justify-center gap-2 font-medium"
            >

              <FaEdit />

              Edit Product

            </button>

          </div>

        </div>

      </div>

    </div>
   
  );
}

export default ProductView;