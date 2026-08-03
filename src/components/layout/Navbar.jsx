import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart, getWishlist } from "../../services/api";
import { motion } from "framer-motion";
import UserDropdown from "./UserDropDown";
import {useDispatch, useSelector} from 'react-redux'
import { setSearch } from "../../redux/slices/SearchSlice";


function Navbar() {


const [openCollection,setOpenCollection] = useState(false);

const dispatch = useDispatch()
const navigate = useNavigate()

const search = useSelector(state=>state.search.search)
const user = useSelector((state) => state.user.user);



const {data:cart=[]}=useQuery({

queryKey:["cart",user?.id],

queryFn:()=>getCart(user.id),

enabled:!!user

});



const {data:wishlist=[]}=useQuery({

queryKey:["wishlist",user?.id],

queryFn:()=>getWishlist(user.id),

enabled:!!user

});




const cartCount = cart.reduce(
(sum,item)=>sum + item.quantity,
0
);


const wishlistCount = wishlist.length;




const categories=[
"Ring",
"Bangle",
"Necklace",
"Bracelet",
"Earring"
];




return (

<nav
className="
fixed
top-0
left-0
w-full
z-50
px-12
py-6
flex
justify-between
items-center
backdrop-blur-md
bg-white/20
"
>


{/* LEFT MENU */}

<div className="flex gap-12">


<Link
to="/"
className="
text-brand-brown
font-serif
text-sm
tracking-[0.2em]
uppercase
"
>

Home

</Link>





{/* COLLECTION DROPDOWN */}


<div
className="relative"

onMouseEnter={()=>
setOpenCollection(true)
}

onMouseLeave={()=>{
    setTimeout(()=>{
        setOpenCollection(false)
    },500)
}}
>


<Link to='/allproducts'><button

className="
text-brand-brown
font-serif
text-sm
tracking-[0.2em]
uppercase
"

>

Collections

</button>
</Link>





{
openCollection &&

<motion.div

initial={{
opacity:0,
y:10
}}

animate={{
opacity:1,
y:0
}}

transition={{
duration:.3
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


{
categories.map(category=>(


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


))
}



</motion.div>

}



</div>





<Link

to="/bestsellers"

className="
text-brand-brown
font-serif
text-sm
tracking-[0.2em]
uppercase
"

>

Best Sellers

</Link>





<Link

to="/orders"

className="
text-brand-brown
font-serif
text-sm
tracking-[0.2em]
uppercase
"

>

Orders

</Link>



</div>







{/* LOGO */}


<motion.div

initial={{
opacity:0
}}

animate={{
opacity:1
}}

className="
text-[#E6C98C]
text-3xl
font-serif
tracking-[0.5em]
"

>

LIORA

</motion.div>







{/* RIGHT SIDE */}



<div
className="
flex
items-center
gap-8
"
>



{/* SEARCH */}

<div

className="
flex
justify-between
items-center

  w-full
    md:w-80
    px-5
    py-3
    rounded-full
    border
    border-brand-gold
    

"

>

<input
  type="text"
  placeholder="Search jewellery..."
  value={search}
  onChange={(e) => {dispatch(setSearch(e.target.value));
     navigate('/allproducts')

  }}
  className="
     
   outline-none
   text-[#E6C98C]
  "
/>


<IoSearch
className="
text-[#E6C98C]
"
/>


</div>



<UserDropdown/>




<Link

to="/wishlist"

className="
relative
"

>


<FaRegHeart

className="
text-brand-brown
text-xl
hover:text-[#E6C98C]
transition
"

/>



{
wishlistCount > 0 &&

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

}



</Link>










<Link

to="/cart"

className="
relative
"

>


<LuShoppingCart

className="
text-brand-brown
text-xl
hover:text-[#E6C98C]
transition
"

/>



{
cartCount >0 &&

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

}



</Link>





</div>



</nav>


)

}


export default Navbar;