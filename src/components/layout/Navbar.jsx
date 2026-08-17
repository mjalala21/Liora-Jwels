// import React, { useState, useEffect } from "react";
// import { FaRegHeart } from "react-icons/fa";
// import { LuShoppingCart } from "react-icons/lu";
// import { IoSearch } from "react-icons/io5";
// import { Link, useNavigate} from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// // import { getCart, getWishlist } from "../../services/api";
// import { getCart } from "../../services/cartApi";
// import { getWishlist } from "../../services/wishlistApi";
// import { motion } from "framer-motion";
// import UserDropdown from "./UserDropDown";
// import {useDispatch, useSelector} from 'react-redux'
// import { setSearch } from "../../redux/slices/SearchSlice";


// function Navbar() {


// const [openCollection,setOpenCollection] = useState(false);

// const[searchInput, setSearchInput] = useState("")

// const dispatch = useDispatch()
// const navigate = useNavigate()

// const search = useSelector(state=>state.search.search)
// const user = useSelector((state) => state.user.user);



// const {data:cart=[]}=useQuery({

// queryKey:["cart",user?.id],

// queryFn:()=>getCart(user.id),

// enabled:!!user

// });



// const {data:wishlist=[]}=useQuery({

// queryKey:["wishlist",user?.id],

// queryFn:()=>getWishlist(user.id),

// enabled:!!user

// });




// const cartCount = cart.reduce(
// (sum,item)=>sum + item.quantity,
// 0
// );


// const wishlistCount = wishlist.length;




// const categories=[
// "Ring",
// "Bangle",
// "Necklace",
// "Bracelet",
// "Earring"
// ];


   
//   useEffect(()=>{

// const timer = setTimeout(()=>{
//   dispatch(setSearch(searchInput))
// },1000)

// return ()=>clearTimeout(timer)

//   },[searchInput])




// return (

// <nav
// className="
// fixed
// top-0
// left-0
// w-full
// z-50
// px-12
// py-6
// flex
// justify-between
// items-center
// backdrop-blur-md
// bg-white/20
// "
// >


// {/* LEFT MENU */}

// <div className="flex gap-12">


// <Link
// to="/"
// className="
// text-brand-brown
// font-serif
// text-sm
// tracking-[0.2em]
// uppercase
// "
// >

// Home

// </Link>





// {/* COLLECTION DROPDOWN */}


// <div
// className="relative"

// onMouseEnter={()=>
// setOpenCollection(true)
// }

// onMouseLeave={()=>{
//     setTimeout(()=>{
//         setOpenCollection(false)
//     },500)
// }}
// >


// <Link to='/allproducts'><button

// className="
// text-brand-brown
// font-serif
// text-sm
// tracking-[0.2em]
// uppercase
// "

// >

// Collections

// </button>
// </Link>





// {
// openCollection &&

// <motion.div

// initial={{
// opacity:0,
// y:10
// }}

// animate={{
// opacity:1,
// y:0
// }}

// transition={{
// duration:.3
// }}


// className="
// absolute
// top-8
// left-0
// bg-white
// rounded-3xl
// shadow-2xl
// p-6
// w-56
// "

// >


// {
// categories.map(category=>(


// <Link

// key={category}

// to={`/products/category/${category}`}
//  onClick={() => setOpenCollection(false)}

// className="
// block
// py-3
// text-brand-brown
// font-serif
// hover:text-brand-gold
// hover:translate-x-2
// transition
// duration-300
// "

// >

// {category}

// </Link>


// ))
// }



// </motion.div>

// }



// </div>





// <Link

// to="/bestsellers"

// className="
// text-brand-brown
// font-serif
// text-sm
// tracking-[0.2em]
// uppercase
// "

// >

// Best Sellers

// </Link>





// <Link

// to="/orders"

// className="
// text-brand-brown
// font-serif
// text-sm
// tracking-[0.2em]
// uppercase
// "

// >

// Orders

// </Link>



// </div>







// {/* LOGO */}


// <motion.div

// initial={{
// opacity:0
// }}

// animate={{
// opacity:1
// }}

// className="
// text-[#E6C98C]
// text-3xl
// font-serif
// tracking-[0.5em]
// "

// >

// LIORA

// </motion.div>







// {/* RIGHT SIDE */}



// <div
// className="
// flex
// items-center
// gap-8
// "
// >



// {/* SEARCH */}

// <div

// className="
// flex
// justify-between
// items-center

//   w-full
//     md:w-80
//     px-5
//     py-3
//     rounded-full
//     border
//     border-brand-gold
    

// "

// >

// <input
//   type="text"
//   placeholder="Search jewellery..."
//   value={searchInput}
//   onChange={(e)=>{setSearchInput(e.target.value);
//      navigate('/allproducts')
//   }}
//   className="
     
//    outline-none
//    text-[#8f6b1d]
//   "
// />


// <IoSearch
// className="
// text-[#E6C98C]
// "
// />


// </div>



// <UserDropdown/>




// <Link

// to="/wishlist"

// className="
// relative
// "

// >


// <FaRegHeart

// className="
// text-brand-brown
// text-xl
// hover:text-[#E6C98C]
// transition
// "

// />



// {
// wishlistCount > 0 &&

// <span

// className="
// absolute
// -top-3
// -right-3
// bg-[#E6C98C]
// text-brand-brown
// text-xs
// w-5
// h-5
// rounded-full
// flex
// items-center
// justify-center
// font-bold
// "

// >

// {wishlistCount}

// </span>

// }



// </Link>










// <Link

// to="/cart"

// className="
// relative
// "

// >


// <LuShoppingCart

// className="
// text-brand-brown
// text-xl
// hover:text-[#E6C98C]
// transition
// "

// />



// {
// cartCount >0 &&

// <span

// className="
// absolute
// -top-3
// -right-3
// bg-[#E6C98C]
// text-brand-brown
// text-xs
// w-5
// h-5
// rounded-full
// flex
// items-center
// justify-center
// font-bold
// "

// >

// {cartCount}

// </span>

// }



// </Link>





// </div>



// </nav>


// )

// }


// export default Navbar;


import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart, LuMenu, LuX, LuChevronDown } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../services/cartApi";
import { getWishlist } from "../../services/wishlistApi";
import { motion, AnimatePresence } from "framer-motion";
import UserDropdown from "./UserDropDown";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../../redux/slices/SearchSlice";

function Navbar() {
  const [openCollection, setOpenCollection] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileCollection, setMobileCollection] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  // =========================
  // CART
  // =========================

  const { data: cart = [] } = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: () => getCart(user.id),
    enabled: !!user,
  });

  // =========================
  // WISHLIST
  // =========================

  const { data: wishlist = [] } = useQuery({
    queryKey: ["wishlist", user?.id],
    queryFn: () => getWishlist(user.id),
    enabled: !!user,
  });

  // =========================
  // COUNTS
  // =========================

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "Ring",
    "Bangle",
    "Necklace",
    "Bracelet",
    "Earring",
  ];

  // =========================
  // SEARCH DEBOUNCE
  // =========================

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearch(searchInput));
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);

  // =========================
  // CLOSE MOBILE MENU
  // =========================

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setMobileCollection(false);
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearch = (e) => {
    setSearchInput(e.target.value);

    if (e.target.value.trim()) {
      navigate("/allproducts");
    }
  };

  return (
    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        px-4
        sm:px-6
        lg:px-12
        py-4
        lg:py-6
        backdrop-blur-md
        bg-white/70
        lg:bg-white/20
      "
    >
      {/* =====================================================
          DESKTOP NAVBAR
      ====================================================== */}

      <div className="hidden lg:flex justify-between items-center">

        {/* LEFT MENU */}

        <div className="flex items-center gap-6 xl:gap-10">

          {/* HOME */}

          <Link
            to="/"
            className="
              text-brand-brown
              font-serif
              text-sm
              tracking-[0.15em]
              xl:tracking-[0.2em]
              uppercase
              hover:text-brand-gold
              transition
            "
          >
            Home
          </Link>

          {/* COLLECTIONS */}

          <div
            className="relative"
            onMouseEnter={() => setOpenCollection(true)}
            onMouseLeave={() => {
              setTimeout(() => {
                setOpenCollection(false);
              }, 500);
            }}
          >
            <Link to="/allproducts">
              <button
                className="
                  text-brand-brown
                  font-serif
                  text-sm
                  tracking-[0.15em]
                  xl:tracking-[0.2em]
                  uppercase
                  hover:text-brand-gold
                  transition
                "
              >
                Collections
              </button>
            </Link>

            <AnimatePresence>
              {openCollection && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="
                    absolute
                    top-8
                    left-0
                    bg-white
                    rounded-3xl
                    shadow-2xl
                    p-6
                    w-56
                  "
                >
                  {categories.map((category) => (
                    <Link
                      key={category}
                      to={`/products/category/${category}`}
                      onClick={() => setOpenCollection(false)}
                      className="
                        block
                        py-3
                        text-brand-brown
                        font-serif
                        hover:text-brand-gold
                        hover:translate-x-2
                        transition
                        duration-300
                      "
                    >
                      {category}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* BEST SELLERS */}

          <Link
            to="/bestsellers"
            className="
              text-brand-brown
              font-serif
              text-sm
              tracking-[0.15em]
              xl:tracking-[0.2em]
              uppercase
              hover:text-brand-gold
              transition
            "
          >
            Best Sellers
          </Link>

          {/* ORDERS */}

          <Link
            to="/orders"
            className="
              text-brand-brown
              font-serif
              text-sm
              tracking-[0.15em]
              xl:tracking-[0.2em]
              uppercase
              hover:text-brand-gold
              transition
            "
          >
            Orders
          </Link>
        </div>

        {/* =====================================================
            LOGO
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="
            text-[#E6C98C]
            text-2xl
            xl:text-3xl
            font-serif
            tracking-[0.4em]
            xl:tracking-[0.5em]
            ml-4
          "
        >
          LIORA
        </motion.div>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <div
          className="
            flex
            items-center
            gap-4
            xl:gap-7
          "
        >

          {/* SEARCH */}

          <div
            className="
              flex
              items-center
              justify-between
              w-44
              xl:w-64
              px-4
              py-2.5
              rounded-full
              border
              border-brand-gold
              bg-white/30
            "
          >
            <input
              type="text"
              placeholder="Search jewellery..."
              value={searchInput}
              onChange={handleSearch}
              className="
                w-full
                bg-transparent
                outline-none
                text-[#8f6b1d]
                text-sm
                placeholder:text-gray-500
              "
            />

            <IoSearch
              className="
                text-[#E6C98C]
                text-lg
                flex-shrink-0
              "
            />
          </div>

          {/* USER */}

          <UserDropdown />

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="relative"
          >
            <FaRegHeart
              className="
                text-brand-brown
                text-xl
                hover:text-[#E6C98C]
                transition
              "
            />

            {wishlistCount > 0 && (
              <span
                className="
                  absolute
                  -top-3
                  -right-3
                  bg-[#E6C98C]
                  text-brand-brown
                  text-xs
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}

          <Link
            to="/cart"
            className="relative"
          >
            <LuShoppingCart
              className="
                text-brand-brown
                text-xl
                hover:text-[#E6C98C]
                transition
              "
            />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -top-3
                  -right-3
                  bg-[#E6C98C]
                  text-brand-brown
                  text-xs
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* =====================================================
          MOBILE / TABLET NAVBAR
      ====================================================== */}

      <div
        className="
          flex
          lg:hidden
          items-center
          justify-between
        "
      >

        {/* HAMBURGER */}

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="
            text-brand-brown
            text-2xl
          "
        >
          {mobileMenu ? <LuX /> : <LuMenu />}
        </button>

        {/* MOBILE LOGO */}

        <Link
          to="/"
          className="
            text-[#E6C98C]
            text-2xl
            sm:text-3xl
            font-serif
            tracking-[0.35em]
          "
        >
          LIORA
        </Link>

        {/* MOBILE RIGHT ICONS */}

        <div className="flex items-center gap-5">

          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="relative"
          >
            <FaRegHeart
              className="
                text-brand-brown
                text-xl
              "
            />

            {wishlistCount > 0 && (
              <span
                className="
                  absolute
                  -top-3
                  -right-3
                  bg-[#E6C98C]
                  text-brand-brown
                  text-[10px]
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}

          <Link
            to="/cart"
            className="relative"
          >
            <LuShoppingCart
              className="
                text-brand-brown
                text-xl
              "
            />

            {cartCount > 0 && (
              <span
                className="
                  absolute
                  -top-3
                  -right-3
                  bg-[#E6C98C]
                  text-brand-brown
                  text-[10px]
                  w-5
                  h-5
                  rounded-full
                  flex
                  items-center
                  justify-center
                  font-bold
                "
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              lg:hidden
              overflow-hidden
              bg-white
              rounded-2xl
              shadow-xl
              mt-4
              p-6
            "
          >

            {/* MOBILE SEARCH */}

            <div
              className="
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-full
                border
                border-brand-gold
                mb-6
              "
            >
              <IoSearch
                className="
                  text-[#E6C98C]
                  text-xl
                "
              />

              <input
                type="text"
                placeholder="Search jewellery..."
                value={searchInput}
                onChange={handleSearch}
                className="
                  w-full
                  outline-none
                  text-[#8f6b1d]
                  bg-transparent
                "
              />
            </div>

            {/* HOME */}

            <Link
              to="/"
              onClick={closeMobileMenu}
              className="
                block
                py-3
                text-brand-brown
                font-serif
                tracking-[0.15em]
                uppercase
              "
            >
              Home
            </Link>

            {/* COLLECTION */}

            <div>
              <button
                onClick={() =>
                  setMobileCollection(!mobileCollection)
                }
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  py-3
                  text-brand-brown
                  font-serif
                  tracking-[0.15em]
                  uppercase
                "
              >
                <span>Collections</span>

                <LuChevronDown
                  className={`
                    transition-transform
                    duration-300
                    ${
                      mobileCollection
                        ? "rotate-180"
                        : ""
                    }
                  `}
                />
              </button>

              <AnimatePresence>
                {mobileCollection && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: "auto",
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    className="
                      overflow-hidden
                      pl-4
                    "
                  >
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to={`/products/category/${category}`}
                        onClick={closeMobileMenu}
                        className="
                          block
                          py-2.5
                          text-gray-600
                          font-serif
                          hover:text-brand-gold
                        "
                      >
                        {category}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* BEST SELLERS */}

            <Link
              to="/bestsellers"
              onClick={closeMobileMenu}
              className="
                block
                py-3
                text-brand-brown
                font-serif
                tracking-[0.15em]
                uppercase
              "
            >
              Best Sellers
            </Link>

            {/* ORDERS */}

            <Link
              to="/orders"
              onClick={closeMobileMenu}
              className="
                block
                py-3
                text-brand-brown
                font-serif
                tracking-[0.15em]
                uppercase
              "
            >
              Orders
            </Link>

            {/* USER */}

            <div
              className="
                pt-4
                mt-3
                border-t
                border-gray-200
              "
            >
              <UserDropdown />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;