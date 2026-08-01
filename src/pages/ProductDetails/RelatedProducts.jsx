import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

function RelatedProducts({ products, product }) {

  const relatedProducts = products
    .filter(
      p =>
        p.category === product.category &&
        p.id !== product.id
    )
    .slice(0, 4);

  if (relatedProducts.length === 0) return null;

  return (
    <section className="bg-[#F8F4EC] py-28">

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="text-center"
        >

          <p className="tracking-[6px] uppercase text-brand-gold">

            Curated For You

          </p>

          <h2 className="mt-5 text-5xl font-serif text-brand-brown">

            You May Also Like

          </h2>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto leading-8">

            Discover more timeless designs from the same
            collection, handcrafted with exceptional detail
            and made to celebrate every unforgettable moment.

          </p>

          <div className="w-28 h-[2px] bg-brand-gold mx-auto mt-8"></div>

        </motion.div>





        {/* Products */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 mt-20">

          {relatedProducts.map(item => (

            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="
                bg-white
                rounded-[35px]
                overflow-hidden
                shadow-md
                hover:shadow-2xl
                transition
              "
            >

              <Link to={`/products/${item.id}`}>

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-full
                      h-[350px]
                      object-cover
                      hover:scale-110
                      transition
                      duration-700
                    "
                  />

                </div>

              </Link>





              <div className="p-7">

                <p className="text-brand-gold">

                  ★★★★★

                </p>

                <h3 className="
                  mt-4
                  text-2xl
                  font-serif
                  text-brand-brown
                ">

                  {item.name}

                </h3>

                <p className="
                  mt-3
                  text-gray-500
                  line-clamp-2
                ">

                  {item.description}

                </p>

                <div className="
                  mt-7
                  flex
                  justify-between
                  items-center
                ">

                  <span className="
                    text-2xl
                    font-serif
                    text-brand-brown
                  ">

                    ₹ {item.price}

                  </span>

                  <Link
                    to={`/products/${item.id}`}
                    className="
                      w-12
                      h-12
                      rounded-full
                      bg-brand-brown
                      text-white
                      flex
                      items-center
                      justify-center
                      hover:bg-brand-gold
                      hover:text-brand-brown
                      transition
                    "
                  >

                    <FaArrowRight />

                  </Link>

                </div>

              </div>

            </motion.div>

          ))}

        </div>





        {/* View Collection Button */}

        <div className="text-center mt-20">

          <Link
            to={`/products/category/${product.category}`}
            className="
              inline-block
              px-10
              py-5
              rounded-full
              bg-brand-brown
              text-white
              tracking-[3px]
              hover:bg-brand-gold
              hover:text-brand-brown
              transition
            "
          >

            Explore Full Collection

          </Link>

        </div>

      </div>

    </section>
  );
}

export default RelatedProducts;