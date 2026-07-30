import React from "react";

function BestSellers() {

  const products = [
    {
      name: "Royal Pearl Necklace",
      image: "images/necklaces/jwellery3.jpg",
    },
    {
      name: "Diamond Elegance",
      image: "images/Hero/jwellery.jpg",
    },
    {
      name: "Classic Gold Ring",
      image: "images/rings/ring13.jpg",
    },
    {
      name: "Elegant Earrings",
      image: "images/earings/earing24.jpg",
    },
  ];


  return (
    <section className="
      min-h-screen
      bg-[#F8F4EC]
      py-24
    ">

      {/* Heading */}
      <div className="
        flex
        flex-col
        items-center
        gap-4
        mb-16
      ">

        <p className="
          text-brand-gold
          tracking-[5px]
          text-sm
        ">
          CUSTOMER FAVOURITES
        </p>


        <h2 className="
          text-5xl
          font-serif
          text-brand-brown
          tracking-wide
        ">
          MOST WANTED PIECES
        </h2>


        <div className="
          w-32
          h-[1px]
          bg-brand-gold
        ">
        </div>


        <p className="
          max-w-xl
          text-center
          text-brand-brown
          text-lg
        ">
          Explore our bestselling jewellery designs, chosen to add a touch 
          of luxury to every unforgettable moment.
        </p>

      </div>



      {/* Products */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-10
        px-10
      ">


      {products.map((product,index)=>(

        <div
          key={index}
          className="
            group
            relative
            bg-white
            rounded-2xl
            overflow-hidden
            shadow-lg
            transition-all
            duration-500
            hover:-translate-y-3
          "
        >


          <img
            src={product.image}
            alt={product.name}
            className="
              w-full
              h-[420px]
              object-cover
              transition-all
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
            duration-500
          ">
          </div>


          <button
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2

              bg-white/20
              backdrop-blur-md

              text-white
              border
              border-white

              px-8
              py-3
              rounded-full

              opacity-0
              group-hover:opacity-100

              transition-all
              duration-500

              hover:bg-white/40
            "
          >
            Buy Now
          </button>



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


            <p className="
              mt-2
              text-brand-gold
              tracking-widest
              text-sm
            ">
              LIORA
            </p>

          </div>


        </div>

      ))}


      </div>


    </section>
  );
}

export default BestSellers;