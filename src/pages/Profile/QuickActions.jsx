import React from "react";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaHeart,
  FaShoppingBag,
  FaUserCog
} from "react-icons/fa";


function QuickActions() {


  const actions = [
    {
      title:"My Orders",
      description:"Track your jewellery orders",
      icon:<FaBoxOpen />,
      link:"/orders"
    },

    {
      title:"Wishlist",
      description:"Your favourite collections",
      icon:<FaHeart />,
      link:"/wishlist"
    },

    {
      title:"My Cart",
      description:"Continue your purchase",
      icon:<FaShoppingBag />,
      link:"/cart"
    },

    {
      title:"Settings",
      description:"Manage your account",
      icon:<FaUserCog />,
      link:"/settings"
    }
  ]



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


        {/* Title */}

        <div
        className="
        text-center
        mb-12
        "
        >

          <p
          className="
          text-[#C9A14A]
          uppercase
          tracking-[0.3em]
          text-sm
          "
          >
            Explore
          </p>


          <h2
          className="
          text-4xl
          font-serif
          text-[#5C4033]
          mt-3
          "
          >
            Your LIORA Space
          </h2>


        </div>





        {/* Cards */}

        <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-8
        "
        >


        {
          actions.map(action=>(

            <Link
            key={action.title}
            to={action.link}
            >

              <div
              className="
              group
              bg-white
              rounded-3xl
              p-8
              text-center
              shadow-lg
              border
              border-transparent
              hover:border-[#C9A14A]
              hover:-translate-y-2
              transition
              duration-500
              "
              >


                {/* Icon */}

                <div
                className="
                mx-auto
                w-16
                h-16
                rounded-full
                bg-[#5C4033]
                text-[#E7C873]
                flex
                items-center
                justify-center
                text-2xl
                group-hover:scale-110
                transition
                duration-500
                "
                >

                  {action.icon}

                </div>





                <h3
                className="
                mt-6
                text-xl
                font-serif
                text-[#5C4033]
                "
                >

                  {action.title}

                </h3>





                <p
                className="
                mt-3
                text-sm
                text-gray-500
                "
                >

                  {action.description}

                </p>





                <div
                className="
                mt-5
                text-[#C9A14A]
                text-sm
                tracking-widest
                opacity-0
                group-hover:opacity-100
                transition
                "
                >

                  VIEW →

                </div>



              </div>


            </Link>

          ))
        }


        </div>


      </div>


    </section>

  )
}


export default QuickActions;