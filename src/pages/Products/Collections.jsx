import { Link } from "react-router-dom";


const collections = [
  {
    name: "Ring",
    image: "images/rings/ring18.jpg",
  },
  {
    name: "Bracelet",
    image: "images/bracelets/bracelet13.png",
  },
  {
    name: "Necklace",
    image: "images/necklaces/neklace10.png",
  },
  {
    name: "Bangle",
    image: "images/bangles/bangle11.png",
  },
  {
    name: "Earing",
    image: "images/earings/earing22.png",
  },
];


function Collections() {
  return (
    <div 
    
  className="
    min-h-screen
    py-20
    bg-[radial-gradient(circle_at_top,#6b4a3a_0%,#3A2118_45%,#1D120D_100%)]
  "
    >
      

      <div className="
        flex 
        flex-col 
        items-center 
        gap-5
      ">

        <h1 className="
          font-serif 
          text-6xl 
          text-brand-gold 
          tracking-wide
        ">
          OUR COLLECTIONS
        </h1>


        <p className="
          text-brand-beige 
          text-lg
        ">
          Explore refined jewellery crafted to complement every occasion.
        </p>


        <div className="
          grid 
          grid-cols-6 
          gap-10 
          mt-16
          px-10
        ">


        {collections.map((item,index)=>(
          
         <Link
  key={index}
  to={`/products/category/${item.name}`}
  className={`
    relative
    group
    transition-all
    duration-500
    hover:scale-[1.03]
    block
    ${index < 3
      ? "col-span-2"
      : "col-start-2 col-span-2"
    }
    ${index === 4 && "col-start-4"}
  `}
>

            <img
              src={item.image}
              alt={item.name}
              className="
                w-full
                h-[420px]
                object-cover
                rounded-xl
                transition-all
                duration-500
                group-hover:blur-[1px]
                group-hover:brightness-75
              "
            />

         <p
 className="
 absolute
 bottom-8
 left-0
 w-full
 text-center
 text-white
 text-3xl
 font-serif
 z-10
 "
>
 {item.name}
</p>

            {/* Dark overlay */}
            <div
              className="
                absolute
                inset-0
                bg-black/20
                rounded-xl
                opacity-0
                group-hover:opacity-100
                transition
                duration-500
              "
            ></div>


            {/* Button */}
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

                rounded-xl
                px-8
                py-3

                opacity-0
                group-hover:opacity-100

                transition-all
                duration-500

                hover:bg-white/30
              "
            >
              Explore
            </button>




        </Link>

        ))}


        </div>

      </div>

    </div>
  )
}

export default Collections;