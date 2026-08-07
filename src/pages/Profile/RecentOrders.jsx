import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import { getOrders, getProducts } from "../../services/api";
import { getOrders } from "../../services/ordersApi";
import { getProducts } from "../../services/productsApi";
import { useSelector } from "react-redux";


function RecentOrders() {


 const user = useSelector((state) => state.user.user);



  const { data: orders = [], isLoading } = useQuery({

    queryKey:["orders", user?.id],

    queryFn:()=>getOrders(user.id),

    enabled:!!user

  });



  const { data: products = [] } = useQuery({

    queryKey:["products"],

    queryFn:getProducts

  });



  if(isLoading){

    return (
      <div className="text-center py-10">
        Loading recent orders...
      </div>
    )

  }



  // Attach product details

  const updatedOrders = orders.map(order=>({

    ...order,

    items: order.items.map(item=>({

      ...item,

      product: products.find(
        p=>String(p.id)===String(item.productId)
      )

    }))

  }));



  // Show only latest 2 orders

  const recentOrders = updatedOrders
  .slice()
  .reverse()
  .slice(0,2);





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





        {
          recentOrders.length === 0 ?

          (
            <div className="
            bg-white
            rounded-3xl
            p-10
            text-center
            shadow-lg
            ">

              <p className="text-gray-500">
                No orders yet
              </p>

            </div>
          )


          :

          (

          <div className="space-y-6">


          {
          recentOrders.map(order=>(

            order.items.map((item,index)=>(

            <div

            key={`${order.id}-${index}`}

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



              <img

              src={item.product?.image}

              alt={item.product?.name}

              className="
              w-32
              h-32
              object-cover
              rounded-2xl
              "

              />






              <div className="flex-1">


                <h3
                className="
                text-2xl
                font-serif
                text-[#5C4033]
                "
                >

                {item.product?.name}

                </h3>



                <p className="
                mt-2
                text-gray-500
                ">

                Ordered on{" "}

                {
                new Date(order.createdAt)
                .toLocaleDateString("en-IN")
                }

                </p>




                <p
                className="
                mt-3
                text-xl
                font-semibold
                text-[#C9A14A]
                "
                >

                ₹ {item.product?.price}

                </p>



              </div>






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


            ))

          ))
          }


          </div>

          )

        }



      </div>


    </section>

  )

}


export default RecentOrders;