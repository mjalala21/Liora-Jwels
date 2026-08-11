import React, { useState } from "react";
import {
  FaTimes,
  FaSave,
  FaGem,
} from "react-icons/fa";

function EditProduct({
  product,
  onClose,
  onSave,
  isSaving,
}) {

  const [name, setName] = useState(product.name || "");
  const [category, setCategory] = useState(product.category || "");
  const [material, setMaterial] = useState(product.material || "");
  const [price, setPrice] = useState(product.price || "");
  const [originalPrice, setOriginalPrice] = useState(
    product.originalPrice || ""
  );
  const [stock, setStock] = useState(product.stock ?? "");
  const [image, setImage] = useState(product.image || "");
  const [description, setDescription] = useState(
    product.description || ""
  );


  const handleSubmit = (e) => {

    e.preventDefault();

    const updatedProduct = {
      ...product,

      name,
      category,
      material,

      price: Number(price),

      originalPrice:
        originalPrice === ""
          ? ""
          : Number(originalPrice),

      stock: Number(stock),

      image,

      description,
    };

    onSave(updatedProduct);
  };


  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

      {/* Background */}

      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />


      {/* Edit Box */}

      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#F8F4EC] rounded-3xl shadow-2xl">


        {/* Header */}

        <div className="sticky top-0 z-10 bg-white border-b px-7 py-5 flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Product Management
            </p>

            <h2 className="text-2xl font-serif text-[#3B2418]">
              Edit Product
            </h2>

          </div>


          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            className="w-10 h-10 rounded-full bg-[#F8F4EC] flex items-center justify-center hover:bg-[#D4AF37] hover:text-white transition"
          >
            <FaTimes />
          </button>

        </div>


        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="p-7 space-y-6"
        >


          {/* Image Preview */}

          <div className="bg-white rounded-2xl p-4">

            <div className="flex items-center gap-5">

              {image ? (

                <img
                  src={image}
                  alt={name}
                  className="w-24 h-24 rounded-2xl object-cover"
                />

              ) : (

                <div className="w-24 h-24 rounded-2xl bg-[#F8F4EC] flex items-center justify-center">

                  <FaGem className="text-3xl text-[#D4AF37]" />

                </div>

              )}


              <div className="flex-1">

                <label className="block text-sm font-medium text-[#3B2418] mb-2">
                  Image URL
                </label>

                <input
                  type="text"
                  value={image}
                  onChange={(e) =>
                    setImage(e.target.value)
                  }
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
                  placeholder="Enter image URL"
                />

              </div>

            </div>

          </div>


          {/* Product Name */}

          <div>

            <label className="block text-sm font-medium text-[#3B2418] mb-2">
              Product Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />

          </div>


          {/* Category + Material */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


            <div>

              <label className="block text-sm font-medium text-[#3B2418] mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                required
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              >

                <option value="">
                  Select Category
                </option>

                <option value="Ring">
                  Ring
                </option>

                <option value="Necklace">
                  Necklace
                </option>

                <option value="Bracelet">
                  Bracelet
                </option>

                <option value="Earing">
                  Earring
                </option>

                <option value="Bangle">
                  Bangle
                </option>

              </select>

            </div>


            <div>

              <label className="block text-sm font-medium text-[#3B2418] mb-2">
                Material
              </label>

              <input
                type="text"
                value={material}
                onChange={(e) =>
                  setMaterial(e.target.value)
                }
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />

            </div>

          </div>


          {/* Price + Original Price */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


            <div>

              <label className="block text-sm font-medium text-[#3B2418] mb-2">
                Price
              </label>

              <input
                type="number"
                value={price}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
                required
                min="0"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />

            </div>


            <div>

              <label className="block text-sm font-medium text-[#3B2418] mb-2">
                Original Price
              </label>

              <input
                type="number"
                value={originalPrice}
                onChange={(e) =>
                  setOriginalPrice(e.target.value)
                }
                min="0"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
              />

            </div>

          </div>


          {/* Stock */}

          <div>

            <label className="block text-sm font-medium text-[#3B2418] mb-2">
              Stock
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              required
              min="0"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37]"
            />

          </div>


          {/* Description */}

          <div>

            <label className="block text-sm font-medium text-[#3B2418] mb-2">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="5"
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#D4AF37] resize-none"
            />

          </div>


          {/* Buttons */}

          <div className="flex gap-4 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl bg-white border border-gray-200 text-gray-600 hover:bg-gray-100 transition font-medium"
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 rounded-xl bg-[#3B2418] text-white hover:bg-[#D4AF37] hover:text-[#3B2418] transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
            >

              <FaSave />

              {isSaving
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;