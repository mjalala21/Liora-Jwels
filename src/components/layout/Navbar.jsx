import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCart, getWishlist } from "../../services/api";
import { motion } from "framer-motion";
import UserDropdown from "./UserDropDown";


function Navbar() {


const [openCollection,setOpenCollection] = useState(false);


const user = JSON.parse(
localStorage.getItem("user")
);



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
bg-black/20
"
>


{/* LEFT MENU */}

<div className="flex gap-12">


<Link
to="/"
className="
text-[#F5E6C8]
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


<Link to='/products'><button

className="
text-[#F5E6C8]
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
text-[#F5E6C8]
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
text-[#F5E6C8]
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
items-center
border-b
border-[#E6C98C]
"

>

<input

placeholder="Search"

className="
bg-transparent
outline-none
w-28
text-[#F5E6C8]
placeholder:text-[#F5E6C8]/60
font-serif
"

/>


<IoSearch
className="
text-[#E6C98C]
"
/>


</div>







{/* USER */}


<UserDropdown/>







{/* WISHLIST */}


<Link

to="/wishlist"

className="
relative
"

>


<FaRegHeart

className="
text-[#F5E6C8]
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







{/* CART */}


<Link

to="/cart"

className="
relative
"

>


<LuShoppingCart

className="
text-[#F5E6C8]
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