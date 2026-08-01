import { motion } from "framer-motion";
import {
  FaGem,
  FaCertificate,
  FaGift,
  FaTruck,
  FaUndoAlt,
  FaShieldAlt,
} from "react-icons/fa";

function ProductServices({ product }) {
  return (
    <section className="bg-white py-28">

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}

        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:.7}}
          viewport={{once:true}}
          className="text-center"
        >

          <p className="tracking-[6px] uppercase text-brand-gold">

            Crafted To Last

          </p>

          <h2 className="mt-5 text-5xl font-serif text-brand-brown">

            Product Information

          </h2>

          <div className="w-28 h-[2px] bg-brand-gold mx-auto mt-8"></div>

        </motion.div>



        <div className="grid lg:grid-cols-2 gap-20 mt-20">

          {/* Left */}

          <motion.div
            initial={{opacity:0,x:-50}}
            whileInView={{opacity:1,x:0}}
            transition={{duration:.8}}
            viewport={{once:true}}
          >

            <h3 className="text-3xl font-serif text-brand-brown">

              About This Piece

            </h3>

            <p className="mt-8 leading-9 text-gray-600">

              {product.description}

            </p>

            <p className="mt-6 leading-9 text-gray-600">

              Every LIORA creation is handcrafted with exceptional
              attention to detail, blending timeless elegance with
              modern sophistication. Designed to celebrate your
              most meaningful moments, each piece reflects
              uncompromising craftsmanship and enduring beauty.

            </p>

          </motion.div>





          {/* Right */}

          <motion.div
            initial={{opacity:0,x:50}}
            whileInView={{opacity:1,x:0}}
            transition={{duration:.8}}
            viewport={{once:true}}
          >

            <div className="bg-[#F8F4EC] rounded-[40px] p-10 shadow-xl">

              <h3 className="text-3xl font-serif text-brand-brown">

                Specifications

              </h3>

              <div className="mt-10 space-y-7">

                <div className="flex justify-between border-b pb-4">

                  <span className="text-gray-500">

                    Category

                  </span>

                  <span className="font-semibold text-brand-brown">

                    {product.category}

                  </span>

                </div>

                <div className="flex justify-between border-b pb-4">

                  <span className="text-gray-500">

                    Material

                  </span>

                  <span className="font-semibold text-brand-brown">

                    18K Gold

                  </span>

                </div>

                <div className="flex justify-between border-b pb-4">

                  <span className="text-gray-500">

                    Finish

                  </span>

                  <span className="font-semibold text-brand-brown">

                    High Polish

                  </span>

                </div>

                <div className="flex justify-between border-b pb-4">

                  <span className="text-gray-500">

                    Stone

                  </span>

                  <span className="font-semibold text-brand-brown">

                    Premium Diamond

                  </span>

                </div>

                <div className="flex justify-between border-b pb-4">

                  <span className="text-gray-500">

                    Hallmark

                  </span>

                  <span className="font-semibold text-brand-brown">

                    BIS Certified

                  </span>

                </div>

              </div>

            </div>

          </motion.div>

        </div>







        {/* Services */}

        <motion.div
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:.8}}
          viewport={{once:true}}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mt-28"
        >


          <div className="bg-[#F8F4EC] rounded-3xl p-10 text-center">

            <FaGem className="mx-auto text-4xl text-brand-gold"/>

            <h4 className="mt-6 text-2xl font-serif text-brand-brown">

              Premium Quality

            </h4>

            <p className="mt-4 text-gray-600 leading-7">

              Expertly handcrafted using the finest precious
              materials.

            </p>

          </div>





          <div className="bg-[#F8F4EC] rounded-3xl p-10 text-center">

            <FaCertificate className="mx-auto text-4xl text-brand-gold"/>

            <h4 className="mt-6 text-2xl font-serif text-brand-brown">

              Certified Jewellery

            </h4>

            <p className="mt-4 text-gray-600 leading-7">

              Every purchase includes an official certificate
              of authenticity.

            </p>

          </div>






          <div className="bg-[#F8F4EC] rounded-3xl p-10 text-center">

            <FaGift className="mx-auto text-4xl text-brand-gold"/>

            <h4 className="mt-6 text-2xl font-serif text-brand-brown">

              Luxury Packaging

            </h4>

            <p className="mt-4 text-gray-600 leading-7">

              Delivered in our signature premium gift box,
              ready for every occasion.

            </p>

          </div>






          <div className="bg-[#F8F4EC] rounded-3xl p-10 text-center">

            <FaShieldAlt className="mx-auto text-4xl text-brand-gold"/>

            <h4 className="mt-6 text-2xl font-serif text-brand-brown">

              Lifetime Care

            </h4>

            <p className="mt-4 text-gray-600 leading-7">

              Complimentary cleaning and inspection to keep
              your jewellery radiant.

            </p>

          </div>

        </motion.div>







        {/* Delivery Banner */}

        <div className="mt-24 bg-brand-brown rounded-[40px] p-12 text-white">

          <div className="grid md:grid-cols-2 gap-10">

            <div className="flex items-center gap-6">

              <FaTruck className="text-5xl text-brand-gold"/>

              <div>

                <h3 className="text-2xl font-serif">

                  Complimentary Shipping

                </h3>

                <p className="mt-2 text-white/80">

                  Free insured delivery across India.

                </p>

              </div>

            </div>

            <div className="flex items-center gap-6">

              <FaUndoAlt className="text-5xl text-brand-gold"/>

              <div>

                <h3 className="text-2xl font-serif">

                  Easy 30-Day Returns

                </h3>

                <p className="mt-2 text-white/80">

                  Shop confidently with hassle-free returns.

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ProductServices;