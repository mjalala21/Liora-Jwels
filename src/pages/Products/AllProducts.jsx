import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { getProducts, getWishlist, addToWishlist, removeFromWishlist } from "../../services/api";
import { getProducts } from "../../services/productsApi";
import { getWishlist, addToWishlist, removeFromWishlist } from "../../services/wishlistApi";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaHeart } from "react-icons/fa";
import { setSearch } from "../../redux/slices/SearchSlice";


function AllProducts() {

const dispatch = useDispatch()
const search = useSelector(
(state)=>state.search.search
);


const [quickView,setQuickView] = useState(null);

const [currentPage, setCurrentPage] = useState(1);

const productsPerPage = 8;

const [showFilters, setShowFilters] = useState(false);

const [categoryFilter, setCategoryFilter] = useState("All");

const [priceFilter, setPriceFilter] = useState("All");
const [sortBy, setSortBy] = useState("");

const queryClient = useQueryClient();

const navigate = useNavigate();

const user = useSelector((state) => state.user.user);


const {data:wishlist=[]} = useQuery({

queryKey:["wishlist", user?.id],

queryFn:()=>getWishlist(user.id),

enabled:!!user

});



const wishlistMutation = useMutation({

mutationFn:addToWishlist,

onSuccess:()=>{

queryClient.invalidateQueries({
queryKey:["wishlist", user.id]
});

}

});



const {data:products=[], isLoading} = useQuery({

queryKey:["products"],

queryFn:getProducts

});

const removeWishlistMutation = useMutation({
  mutationFn : removeFromWishlist,
 onSuccess : ()=>{
  queryClient.invalidateQueries({
    queryKey : ['wishlist', user.id]
  })
 }
  
})

useEffect(() => {
  setCurrentPage(1);
}, [search]);


if(isLoading){

return(
<div className="h-screen flex justify-center items-center">
Loading Products...
</div>
)

}




// const filteredProducts = products.filter(product =>
//   product.name
//     ?.toLowerCase()
//     .includes((search || "").toLowerCase())
// );

let filteredProducts = products

.filter(product =>
product.name
?.toLowerCase()
.includes((search || "").toLowerCase())
)


.filter(product =>
categoryFilter === "All"
?
true
:
product.category === categoryFilter
)


.filter(product =>
priceFilter === "All"
?
true
:
priceFilter === "low"
?
product.price < 10000
:
product.price >= 10000
);



if(sortBy==="priceLow"){

filteredProducts.sort(
(a,b)=>a.price-b.price
);

}


if(sortBy==="priceHigh"){

filteredProducts.sort(
(a,b)=>b.price-a.price
);

}



// Pagination

const totalPages = Math.ceil(
  filteredProducts.length / productsPerPage
);


const startIndex = (currentPage - 1) * productsPerPage;


const currentProducts = filteredProducts.slice(
  startIndex,
  startIndex + productsPerPage
);

function handleWishlist(product){


if(!user){

navigate("/login");

return;

}


const alreadyAdded = wishlist.find(item=>

String(item.productId) === String(product.id)

);



if(alreadyAdded){

  removeWishlistMutation.mutate(alreadyAdded.id)

return;

}



const wishlistItem={

userId:user.id,

productId:product.id

};


wishlistMutation.mutate(wishlistItem);


}


return(


<div className="
bg-[#F8F4EC]
min-h-screen
pt-32
px-10
py-20
">


{/* Header */}

<div className="
text-center
mb-16
">

<h1 className="
text-6xl
font-serif
text-brand-brown
">

All Collections

</h1>


<p className="
mt-4
text-gray-600
">

Discover our timeless jewellery pieces

</p>


</div>




{/* Filter Button */}

<div className="flex justify-end mb-8 relative">


<button

onClick={()=>setShowFilters(!showFilters)}

className="
flex
items-center
gap-3
bg-[#3A2418]
text-white
px-6
py-3
rounded-full
hover:bg-[#D4AF37]
transition
duration-300
shadow-lg
"

>

<span>
☰
</span>

Filters

</button>




{/* Filter Panel */}

{
showFilters &&

<div
className="
absolute
right-0
top-16
z-30
w-80
bg-[#F8F4EC]
border
border-[#D4AF37]
rounded-3xl
shadow-2xl
p-6
"
>


<h3 className="
text-xl
font-serif
text-[#3A2418]
mb-5
">

Refine Collection

</h3>



{/* Category */}

<div className="mb-5">

<label className="
text-sm
text-[#6F4E37]
">

Category

</label>


<select

value={categoryFilter}

onChange={(e)=>setCategoryFilter(e.target.value)}

className="
w-full
mt-2
px-4
py-3
rounded-full
border
border-[#D4AF37]
bg-white
outline-none
"

>


<option value="All">
All Jewellery
</option>

<option value="Ring">
Rings
</option>

<option value="Necklace">
Necklaces
</option>

<option value="Earing">
Earings
</option>

<option value="Bracelet">
Bracelets
</option>

<option value="Bangle">
Bangles
</option>


</select>


</div>



{/* Price */}

<div className="mb-5">


<label className="
text-sm
text-[#6F4E37]
">

Price

</label>


<select

value={priceFilter}

onChange={(e)=>setPriceFilter(e.target.value)}

className="
w-full
mt-2
px-4
py-3
rounded-full
border
border-[#D4AF37]
bg-white
"


>


<option value="All">
All Prices
</option>

<option value="low">
Below ₹10000
</option>

<option value="high">
Above ₹10000
</option>


</select>


</div>






{/* Sort */}

<div>


<label className="
text-sm
text-[#6F4E37]
">

Sort

</label>


<select

value={sortBy}

onChange={(e)=>setSortBy(e.target.value)}

className="
w-full
mt-2
px-4
py-3
rounded-full
border
border-[#D4AF37]
bg-white
"


>

<option value="">
Sort By
</option>

<option value="priceLow">
Price Low → High
</option>

<option value="priceHigh">
Price High → Low
</option>


</select>



</div>



</div>


}


</div>


{/* Products Grid */}

{filteredProducts.length > 0 ? (



<div className="
grid
grid-cols-1
md:grid-cols-2
xl:grid-cols-4
gap-10
">


{

currentProducts.map(product=>(


<div

key={product.id}

className="
group
bg-white
rounded-3xl
overflow-hidden
shadow-md
hover:shadow-2xl
transition
duration-500
"

>


{/* Image */}


<div className="
relative
overflow-hidden
">


<Link to={`/products/${product.id}`}>


<img

src={product.image}

alt={product.name}

className="
w-full
h-[380px]
object-cover
group-hover:scale-110
transition
duration-700
"

/>


</Link>



{/* Quick View */}


<div
className="
absolute
top-5
right-5
flex
flex-col
gap-3
"
>


<button

onClick={()=>handleWishlist(product)}

className="
bg-white
p-3
rounded-full
shadow
hover:text-red-500
transition
"

>

<FaHeart

className={
wishlist.some(
item=>String(item.productId)===String(product.id)
)
?
"text-red-500"
:
"text-gray-400"
}

/>

</button>



<button

onClick={()=>setQuickView(product)}

className="
bg-white
p-3
rounded-full
shadow
"

>

<FaEye/>

</button>


</div>



</div>





{/* Details */}


<div className="
p-6
text-center
">


<h2 className="
text-xl
font-serif
text-brand-brown
">

{product.name}

</h2>



<p className="
text-brand-gold
mt-2
">

★★★★★

</p>



<p className="
text-lg
font-semibold
text-brand-brown
mt-2
">

₹ {product.price}

</p>



<Link

to={`/products/${product.id}`}

className="
block
mt-5
bg-brand-brown
text-white
py-3
rounded-full
hover:bg-brand-gold
transition
"

>

View Product

</Link>



</div>




</div>



))

}


</div>

) :  (



<div className="py-24 text-center">

  <h2 className="text-4xl font-serif text-brand-brown">
    No Matching Jewellery Found
  </h2>

  <p className="mt-4 text-gray-500">
    We couldn't find any pieces matching your selection.
  </p>

  <button
    onClick={() => {
      dispatch(setSearch(""))
      setCategoryFilter("All");
      setPriceFilter("All");
      setSortBy("");
    }}
    className="
      mt-8
      px-8
      py-3
      rounded-full
      bg-brand-brown
      text-white
      hover:bg-brand-gold
      hover:text-brand-brown
      transition
    "
  >
    Clear Filters
  </button>

</div>



)}

{/* pagination */}

{filteredProducts.length > 0 && (

<div className="
flex
justify-center
items-center
gap-4
mt-12
">


<button

disabled={currentPage === 1}

onClick={()=>setCurrentPage(prev=>prev-1)}

className="
px-5
py-2
rounded-full
bg-brand-brown
text-white
disabled:opacity-40
"

>

Previous

</button>



{
Array.from({length:totalPages},(_,index)=>(

<button

key={index}

onClick={()=>setCurrentPage(index+1)}

className={`
px-4
py-2
rounded-full
${
currentPage === index+1
?
"bg-brand-gold text-white"
:
"bg-white text-brand-brown"
}
`}

>

{index+1}

</button>


))
}



<button

disabled={currentPage === totalPages}

onClick={()=>setCurrentPage(prev=>prev+1)}

className="
px-5
py-2
rounded-full
bg-brand-brown
text-white
disabled:opacity-40
"

>

Next

</button>


</div>
)}



{/* Quick View Modal */}


{

quickView &&


<div className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
">


<div className="
bg-white
rounded-3xl
p-10
max-w-lg
relative
">


<button

onClick={()=>setQuickView(null)}

className="
absolute
right-5
top-5
"

>

✕

</button>




<img

src={quickView.image}

className="
w-72
h-72
object-cover
rounded-xl
mx-auto
"

/>



<h2 className="
text-3xl
font-serif
text-brand-brown
mt-5
">

{quickView.name}

</h2>



<p className="mt-3">

{quickView.description}

</p>



<p className="
text-brand-gold
text-xl
mt-3
">

₹ {quickView.price}

</p>


</div>



</div>

}



</div>


)

}


export default AllProducts;