import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPinterestP } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function Footer() {

  return (
    <footer className="
      bg-[#3A2118]
      text-[#F8F4EC]
    
    ">

      <div className="
        max-w-7xl
        mx-auto
        px-10
        py-16
      ">


        {/* Logo Section */}

        <div className="
          flex
          flex-col
          items-center
          text-center
          mb-14
        ">

          <h1 className="
            text-5xl
            font-serif
            tracking-[8px]
            text-[#D4AF37]
          ">
            LIORA
          </h1>


          <p className="
            mt-3
            text-sm
            tracking-[5px]
            text-[#F8F4EC]/70
          ">
            TIMELESS ELEGANCE
          </p>


          <div className="
            w-32
            h-[1px]
            bg-[#D4AF37]
            mt-6
          "></div>


        </div>



        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-12
        ">


          {/* About */}

          <div>

            <h2 className="
              text-xl
              text-[#D4AF37]
              font-serif
              mb-5
            ">
              About LIORA
            </h2>


            <p className="
              text-sm
              leading-7
              text-[#F8F4EC]/80
            ">
              Discover exquisite jewellery designed to celebrate
              your most precious moments. Every LIORA creation
              reflects elegance, beauty, and timeless craftsmanship.
            </p>

          </div>



          {/* Explore */}

          <div>

            <h2 className="
              text-xl
              text-[#D4AF37]
              font-serif
              mb-5
            ">
              Explore
            </h2>


            <div className="
              flex
              flex-col
              gap-3
              text-sm
            ">

              <Link className="hover:text-[#D4AF37] transition">
                Home
              </Link>

              <Link className="hover:text-[#D4AF37] transition">
                Collections
              </Link>

              <Link className="hover:text-[#D4AF37] transition">
                Best Sellers
              </Link>

              <Link className="hover:text-[#D4AF37] transition">
                New Arrivals
              </Link>

            </div>

          </div>




          {/* Customer Care */}

          <div>

            <h2 className="
              text-xl
              text-[#D4AF37]
              font-serif
              mb-5
            ">
              Customer Care
            </h2>


            <div className="
              flex
              flex-col
              gap-3
              text-sm
            ">

              <Link className="hover:text-[#D4AF37] transition">
                My Account
              </Link>

              <Link className="hover:text-[#D4AF37] transition">
                Orders
              </Link>

              <Link className="hover:text-[#D4AF37] transition">
                Wishlist
              </Link>

              <Link className="hover:text-[#D4AF37] transition">
                Contact Us
              </Link>

            </div>

          </div>




          {/* Contact */}

          <div>

            <h2 className="
              text-xl
              text-[#D4AF37]
              font-serif
              mb-5
            ">
              Contact
            </h2>


            <div className="
              flex
              items-center
              gap-3
              mb-4
              text-sm
            ">
              <FiMail className="text-[#D4AF37]" />
              support@liora.com
            </div>


            <div className="
              flex
              items-center
              gap-3
              mb-4
              text-sm
            ">
              <FiPhone className="text-[#D4AF37]" />
              +1 (555) 123-4567
            </div>


            <div className="
              flex
              items-center
              gap-3
              mb-6
              text-sm
            ">
              <FiMapPin className="text-[#D4AF37]" />
              Luxury Jewellery Studio
            </div>



            <div className="
              flex
              gap-5
              text-xl
            ">

              <FaInstagram 
                className="
                  cursor-pointer
                  hover:text-[#D4AF37]
                  transition
                "
              />

              <FaFacebookF
                className="
                  cursor-pointer
                  hover:text-[#D4AF37]
                  transition
                "
              />

              <FaPinterestP
                className="
                  cursor-pointer
                  hover:text-[#D4AF37]
                  transition
                "
              />

            </div>


          </div>


        </div>


      </div>



      {/* Bottom */}

      <div className="
        border-t
        border-[#D4AF37]/30
        py-5
        text-center
        text-sm
        text-[#F8F4EC]/70
      ">
        © {new Date().getFullYear()} LIORA. Crafted with elegance.
      </div>


    </footer>
  );
}


export default Footer;