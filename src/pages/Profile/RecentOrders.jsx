import React from "react";
import { Link } from "react-router-dom";


function RecentOrders() {


  // Later replace this with your order API
  const orders = [
    {
      id:1,
      name:"Royal Diamond Ring",
      image:"/images/rings/ring1.jpg",
      price:74999,
      status:"Delivered",
      date:"July 25, 2026"
    },

    {
      id:2,
      name:"Pearl Elegance Necklace",
      image:"/images/necklaces/necklace1.jpg",
      price:45999,
      status:"Processing",
      date:"July 28, 2026"
    }
  ];



  return (

    <section
    className="
    bg-[#F8F4EC]
    px-6
    md:px-12
    py-16
    "
    >


      <div
      className="
      max-w-6xl
      mx-auto
      "
      >



        {/* Heading */}

        <div
        className="
        flex
        justify-between
        items-center
        mb-10
        "
        >

          <div>

            <p
            className="
            text-[#C9A14A]
            uppercase
            tracking-[0.3em]
            text-sm
            "
            >
              Collection History
            </p>


            <h2
            className="
            text-4xl
            font-serif
            text-[#5C4033]
            mt-3
            "
            >
              Recent Orders
            </h2>


          </div>



          <Link
          to="/orders"
          className="
          hidden
          md:block
          text-[#C9A14A]
          tracking-widest
          text-sm
          hover:text-[#5C4033]
          transition
          "
          >

            VIEW ALL →

          </Link>


        </div>







        {/* Orders */}


        <div
        className="
        space-y-6
        "
        >


        {
          orders.map(order=>(

            <div
            key={order.id}
            className="
            bg-white
            rounded-3xl
            p-6
            shadow-lg
            flex
            flex-col
            md:flex-row
            md:items-center
            gap-6
            hover:shadow-2xl
            transition
            duration-500
            "
            >




              {/* Product Image */}

              <img
              src={order.image}
              alt={order.name}
              className="
              w-32
              h-32
              object-cover
              rounded-2xl
              "
              />





              {/* Details */}

              <div
              className="
              flex-1
              "
              >


                <h3
                className="
                text-2xl
                font-serif
                text-[#5C4033]
                "
                >

                {order.name}

                </h3>



                <p
                className="
                mt-2
                text-gray-500
                "
                >

                Ordered on {order.date}

                </p>



                <p
                className="
                mt-3
                text-xl
                font-semibold
                text-[#C9A14A]
                "
                >

                ₹ {order.price}

                </p>


              </div>







              {/* Status */}


              <div>

                <span
                className={`
                px-5
                py-2
                rounded-full
                text-sm
                tracking-wider
                ${
                  order.status==="Delivered"
                  ?
                  "bg-green-100 text-green-700"
                  :
                  "bg-yellow-100 text-yellow-700"
                }
                `}
                >

                {order.status}

                </span>


              </div>



            </div>


          ))
        }


        </div>






      </div>


    </section>

  )
}


export default RecentOrders;