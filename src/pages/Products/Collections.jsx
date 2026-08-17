// import { Link } from "react-router-dom";


// const collections = [
//   {
//     name: "Ring",
//     image: "images/rings/ring18.jpg",
//   },
//   {
//     name: "Bracelet",
//     image: "images/bracelets/bracelet13.png",
//   },
//   {
//     name: "Necklace",
//     image: "images/necklaces/neklace10.png",
//   },
//   {
//     name: "Bangle",
//     image: "images/bangles/bangle11.png",
//   },
//   {
//     name: "Earing",
//     image: "images/earings/earing22.png",
//   },
// ];


// function Collections() {
//   return (
//     <div 
    
//   className="
//     min-h-screen
//     py-20
//     bg-[#6F4E37]
//   "
//     >
      

//       <div className="
//         flex 
//         flex-col 
//         items-center 
//         gap-5
//       ">

//         <h1 className="
//           font-serif 
//           text-6xl 
//           text-brand-gold 
//           tracking-wide
//         ">
//           OUR COLLECTIONS
//         </h1>


//         <p className="
//           text-brand-beige 
//           text-lg
//         ">
//           Explore refined jewellery crafted to complement every occasion.
//         </p>


//         <div className="
//           grid 
//           grid-cols-6 
//           gap-10 
//           mt-16
//           px-10
//         ">


//         {collections.map((item,index)=>(
          
//          <Link
//   key={index}
//   to={`/products/category/${item.name}`}
//   className={`
//     relative
//     group
//     transition-all
//     duration-500
//     hover:scale-[1.03]
//     block
//     ${index < 3
//       ? "col-span-2"
//       : "col-start-2 col-span-2"
//     }
//     ${index === 4 && "col-start-4"}
//   `}
// >

//             <img
//               src={item.image}
//               alt={item.name}
//               className="
//                 w-full
//                 h-[420px]
//                 object-cover
//                 rounded-xl
//                 transition-all
//                 duration-500
//                 group-hover:blur-[1px]
//                 group-hover:brightness-75
//               "
//             />

//          <p
//  className="
//  absolute
//  bottom-8
//  left-0
//  w-full
//  text-center
//  text-white
//  text-3xl
//  font-serif
//  z-10
//  "
// >
//  {item.name}
// </p>

//             {/* Dark overlay */}
//             <div
//               className="
//                 absolute
//                 inset-0
//                 bg-black/20
//                 rounded-xl
//                 opacity-0
//                 group-hover:opacity-100
//                 transition
//                 duration-500
//               "
//             ></div>


//             {/* Button */}
//             <button
//               className="
//                 absolute
//                 top-1/2
//                 left-1/2
//                 -translate-x-1/2
//                 -translate-y-1/2

//                 bg-white/20
//                 backdrop-blur-md

//                 text-white
//                 border
//                 border-white

//                 rounded-xl
//                 px-8
//                 py-3

//                 opacity-0
//                 group-hover:opacity-100

//                 transition-all
//                 duration-500

//                 hover:bg-white/30
//               "
//             >
//               Explore
//             </button>




//         </Link>

//         ))}


//         </div>

//       </div>

//     </div>
//   )
// }

// export default Collections;

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
    <section
      className="
        min-h-screen
        bg-[#6F4E37]
        py-20
        sm:py-24
        lg:py-28
        px-4
        sm:px-6
        lg:px-10
      "
    >
      {/* =========================
          HEADER
      ========================== */}

      <div
        className="
          flex
          flex-col
          items-center
          text-center
        "
      >
        <h1
          className="
            font-serif
            text-4xl
            sm:text-5xl
            lg:text-6xl
            text-brand-gold
            tracking-wide
          "
        >
          OUR COLLECTIONS
        </h1>

        <p
          className="
            text-brand-beige
            text-sm
            sm:text-base
            lg:text-lg
            mt-4
            max-w-xl
            leading-relaxed
          "
        >
          Explore refined jewellery crafted to complement
          every occasion.
        </p>
      </div>

      {/* =========================
          COLLECTION GRID
      ========================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-6
          gap-6
          sm:gap-8
          lg:gap-10
          mt-12
          sm:mt-16
          max-w-7xl
          mx-auto
        "
      >
        {collections.map((item, index) => (
          <Link
            key={index}
            to={`/products/category/${item.name}`}
            className={`
              relative
              group
              block
              overflow-hidden
              rounded-xl
              transition-all
              duration-500
              
              hover:scale-[1.02]

              ${
                index < 3
                  ? "lg:col-span-2"
                  : "lg:col-start-2 lg:col-span-2"
              }

              ${
                index === 4
                  ? "lg:col-start-4"
                  : ""
              }
            `}
          >
            {/* =========================
                IMAGE
            ========================== */}

            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="
                w-full

                h-[380px]
                sm:h-[420px]
                lg:h-[420px]

                object-cover

                transition-all
                duration-700

                group-hover:scale-105
                group-hover:brightness-75
              "
            />

            {/* =========================
                DARK OVERLAY
            ========================== */}

            <div
              className="
                absolute
                inset-0
                bg-black/20
                group-hover:bg-black/40
                transition-all
                duration-500
              "
            ></div>

            {/* =========================
                COLLECTION NAME
            ========================== */}

            <p
              className="
                absolute
                bottom-6
                sm:bottom-8
                left-0
                w-full

                text-center
                text-white

                text-2xl
                sm:text-3xl

                font-serif
                tracking-wide

                z-10

                transition-all
                duration-500

                group-hover:-translate-y-16
              "
            >
              {item.name}
            </p>

            {/* =========================
                EXPLORE
            ========================== */}

            <span
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

                px-7
                sm:px-8
                py-2.5
                sm:py-3

                text-sm
                sm:text-base

                opacity-0

                group-hover:opacity-100

                transition-all
                duration-500

                whitespace-nowrap

                hover:bg-white/30

                z-20
              "
            >
              Explore
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Collections;