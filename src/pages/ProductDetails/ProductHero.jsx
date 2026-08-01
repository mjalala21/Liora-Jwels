import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaStar,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
  FaHeart,
  FaRegHeart,
  FaMinus,
  FaPlus
} from "react-icons/fa";

function ProductHero({
  product,
  quantity,
  setQuantity,
  handleAddCart,
   handleBuyNow,
  handleWishlist,
  isWishlisted
}) {



     if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading product...
      </div>
    );}


  return (
    <section className="bg-[#F8F4EC] min-h-screen pt-36 pb-24 px-8">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

        {/* LEFT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
        >

          <div className="bg-white rounded-[40px] shadow-2xl p-8">

            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: .5 }}
              src={product.image}
              alt={product.name}
              className="w-full h-[650px] object-cover rounded-[30px]"
            />

          </div>

        </motion.div>



        {/* RIGHT DETAILS */}

        <motion.div
          initial={{ opacity:0, x:70 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:.7 }}
        >

          <p className="tracking-[6px] uppercase text-brand-gold text-sm">

            LIORA COLLECTION

          </p>

          <h1 className="mt-5 text-6xl font-serif text-brand-brown leading-tight">

            {product.name}

          </h1>

          <div className="flex items-center gap-2 mt-8 text-brand-gold">

            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStar/>
            <FaStar/>

            <span className="text-gray-500 ml-3">

              (218 Reviews)

            </span>

          </div>

          <h2 className="text-5xl font-serif text-brand-brown mt-10">

            ₹ {product.price}

          </h2>

          <p className="mt-8 leading-8 text-gray-600">

            {product.description}

          </p>



          {/* Quantity */}

          {/* <div className="flex items-center gap-6 mt-12">

            <span className="text-brand-brown font-semibold">

              Quantity

            </span>

            <div className="flex items-center rounded-full bg-white shadow-md overflow-hidden">

              <button
                onClick={() =>
                  quantity > 1 &&
                  setQuantity(quantity-1)
                }
                className="px-6 py-4 hover:bg-gray-100"
              >
                <FaMinus/>
              </button>

              <span className="px-8 font-semibold">

                {quantity}

              </span>

              <button
                onClick={() =>
                  setQuantity(quantity+1)
                }
                className="px-6 py-4 hover:bg-gray-100"
              >
                <FaPlus/>
              </button>

            </div>

          </div> */}



          {/* Buttons */}

          <div className="flex gap-5 mt-12">

            <button
              onClick={handleAddCart}
              className="flex-1 bg-brand-brown text-white rounded-full py-5 tracking-widest hover:bg-brand-gold hover:text-brand-brown transition duration-300"
            >

              ADD TO BAG

            </button>

<button
  onClick={() => handleWishlist(product)}
  className={`
    h-16
    w-16
    rounded-full
    border-2
    flex
    items-center
    justify-center
    transition-all
    duration-300

    ${
      isWishlisted
        ? "bg-red-500 border-red-500 scale-110"
        : "border-brand-brown hover:bg-brand-brown hover:text-white"
    }
  `}
>
  {isWishlisted ? (
    <FaHeart className="text-2xl text-white" />
  ) : (
    <FaRegHeart className="text-2xl text-brand-brown group-hover:text-white" />
  )}
</button>

          </div>



         <button
onClick={handleBuyNow}
className="
w-full
mt-6
py-5
rounded-full
bg-brand-gold
text-brand-brown
tracking-widest
hover:scale-105
transition
"
>
BUY NOW
</button>



          {/* Luxury Service Cards */}

          <div className="grid grid-cols-3 gap-6 mt-16">

            <div className="bg-white rounded-3xl p-6 text-center shadow-lg">

              <FaShieldAlt className="mx-auto text-3xl text-brand-gold"/>

              <p className="mt-4 text-sm font-semibold">

                Hallmark Certified

              </p>

            </div>

            <div className="bg-white rounded-3xl p-6 text-center shadow-lg">

              <FaTruck className="mx-auto text-3xl text-brand-gold"/>

              <p className="mt-4 text-sm font-semibold">

                Free Shipping

              </p>

            </div>

            <div className="bg-white rounded-3xl p-6 text-center shadow-lg">

              <FaUndoAlt className="mx-auto text-3xl text-brand-gold"/>

              <p className="mt-4 text-sm font-semibold">

                Easy Returns

              </p>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

    



    
  );

}

export default ProductHero;