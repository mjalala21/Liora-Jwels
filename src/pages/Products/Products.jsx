import React from "react";
import { Link, useNavigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../services/productsApi";


function Products() {

  const navigate = useNavigate()


  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts
  });



  if(isLoading){
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-brand-brown text-xl">
          Loading Collections...
        </p>
      </div>
    );
  }



  if(error){
    return (
      <p>
        {error.message}
      </p>
    );
  }




  const categories = [
    {
      title:"Rings",
      category:"Ring"
    },
    {
      title:"Bracelets",
      category:"Bracelet"
    },
    {
      title:"Necklaces",
      category:"Necklace"
    },
    {
      title:"Earrings",
      category:"Earing"
    },
    {
      title:"Bangles",
      category:"Bangle"
    }
  ];




  return (

    <div className="bg-[#F8F4EC] min-h-screen">


      {/* HERO SECTION */}

      <div
        style={{
          backgroundImage:
          "url('images/Hero/hero1.jpg')"
        }}
        className="
          relative
          h-[70vh]
          bg-cover
          bg-center
        "
      >

        <div className="
          absolute
          inset-0
          bg-black/40
          flex
          flex-col
          justify-center
          items-center
          text-center
          px-5
        ">


          <h1 className="
            text-6xl
            md:text-7xl
            font-serif
            text-white
            tracking-wide
          ">
            Dreamy Collections
          </h1>


          <p className="
            mt-6
            max-w-2xl
            text-lg
            text-white/90
            leading-8
          ">
            Discover exquisite jewellery designed to celebrate
            elegance, beauty, and unforgettable moments.
          </p>


          <div className="
            w-32
            h-[1px]
            bg-brand-gold
            mt-8
          "></div>


        </div>

      </div>





      {/* PRODUCTS SECTIONS */}


      <div className="
        px-10
        py-24
        space-y-24
      ">



      {
        categories.map((item,index)=>{


          const products = data
          .filter(product=>product.category === item.category)
          .slice(0,4);



          return (

          <section key={index}>


            {/* Category Heading */}

            <div className="
              flex
              justify-between
              items-center
              mb-10
            ">


              <h2 className="
                text-4xl
                font-serif
                text-brand-brown
              ">
                {item.title}
              </h2>


              <Link
                to={`/products/category/${item.category}`}
                className="
                  text-brand-gold
                  tracking-wider
                  hover:underline
                "
              >
                View All →
              </Link>


            </div>





            {/* Product Grid */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-4
              gap-8
            ">


            {
              products.map(product=>(


                <div
                  key={product.id}
                  className="
                    group
                    bg-white
                    rounded-2xl
                    overflow-hidden
                    shadow-md
                    hover:shadow-2xl
                    transition-all
                    duration-500
                  "
                >


                  {/* Image */}

                  <div className="
                    relative
                    overflow-hidden
                  ">


                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-full
                        h-[360px]
                        object-cover
                        transition
                        duration-700
                        group-hover:scale-110
                      "
                    />


                    {/* Hover Overlay */}

                    <div className="
                      absolute
                      inset-0
                      bg-black/20
                      opacity-0
                      group-hover:opacity-100
                      transition
                    ">
                    </div>



                    <Link to={`/products/${product.id}`}><button 
                      className="
                        absolute
                        bottom-5
                        left-1/2
                        -translate-x-1/2
                        bg-white/20
                        backdrop-blur-md
                        border
                        border-white
                        text-white
                        px-8
                        py-3
                        rounded-full
                        opacity-0
                        group-hover:opacity-100
                        transition
                      "
                    >
                      View Details
                    </button></Link>



                  </div>





                  {/* Product Info */}

                  <div className="
                    p-5
                    text-center
                  ">


                    <h3 className="
                      font-serif
                      text-xl
                      text-brand-brown
                    ">
                      {product.name}
                    </h3>



                    <div className="
                      text-brand-gold
                      mt-2
                    ">
                      ★★★★★
                    </div>



                    <p className="
                      mt-2
                      text-lg
                      font-semibold
                      text-brand-brown
                    ">
                      ₹ {product.price}
                    </p>



                  </div>



                </div>


              ))
            }


            </div>


          </section>

          )

        })
      }


      </div>


    </div>

  );
}


export default Products;