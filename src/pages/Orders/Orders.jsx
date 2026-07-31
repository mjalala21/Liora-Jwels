import React from "react";
import { FaBoxOpen, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";


function MyOrders() {


  return (
    <div className="
      min-h-screen
      bg-[#F8F4EC]
      px-6
      py-16
    ">


      {/* Header */}

      <div className=" pt-20
        text-center
        mb-14
      ">

        <h1 className="
          text-5xl
          font-serif
          text-brand-brown
          tracking-wide
        ">
          My Orders
        </h1>


        <p className="
          mt-4
          text-gray-600
        ">
          Your timeless jewellery journey
        </p>

      </div>





      <div className="
        max-w-5xl
        mx-auto
        space-y-8
      ">



        {/* Order Card */}

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          p-8
        ">



          {/* Order Header */}

          <div className="
            flex
            justify-between
            items-center
            flex-wrap
            gap-4
            border-b
            pb-5
          ">


            <div>

              <h2 className="
                text-xl
                font-serif
                text-brand-brown
              ">
                Order #LIORA1024
              </h2>


              <div className="
                flex
                items-center
                gap-2
                text-gray-500
                mt-2
              ">

                <FaCalendarAlt/>

                <span>
                  July 31, 2026
                </span>

              </div>

            </div>



            <span className="
              bg-[#D4AF37]/20
              text-[#8B6B25]
              px-5
              py-2
              rounded-full
              font-medium
            ">
              Processing
            </span>


          </div>







          {/* Product */}


          <div className="
            mt-8
            flex
            gap-6
            items-center
          ">


            <img
              src="/images/rings/ring18.jpg"
              className="
                w-28
                h-28
                object-cover
                rounded-2xl
              "
            />



            <div>


              <h3 className="
                text-2xl
                font-serif
                text-brand-brown
              ">
                Diamond Ring
              </h3>


              <p className="
                text-gray-600
                mt-2
              ">
                Quantity : 1
              </p>


              <p className="
                text-lg
                mt-2
                font-semibold
                text-brand-gold
              ">
                ₹25,000
              </p>


            </div>


          </div>







          {/* Delivery */}


          <div className="
            mt-8
            bg-[#F8F4EC]
            rounded-2xl
            p-5
          ">


            <div className="
              flex
              gap-3
              items-center
              text-brand-brown
            ">

              <FaMapMarkerAlt/>

              <h3 className="
                font-semibold
              ">
                Delivery Address
              </h3>


            </div>



            <p className="
              mt-3
              text-gray-600
            ">
              Customer Name <br/>
              Kochi, Kerala <br/>
              India
            </p>


          </div>






          {/* Bottom */}

          <div className="
            mt-8
            flex
            justify-between
            items-center
            border-t
            pt-6
            flex-wrap
            gap-4
          ">


            <div>

              <p className="text-gray-500">
                Total Amount
              </p>

              <h2 className="
                text-2xl
                font-semibold
                text-brand-brown
              ">
                ₹25,000
              </h2>

            </div>





            <button
              className="
                bg-brand-brown
                text-white
                px-8
                py-3
                rounded-full
                hover:bg-brand-gold
                transition
              "
            >
              View Details
            </button>


          </div>




        </div>




      </div>


    </div>
  )
}


export default MyOrders;