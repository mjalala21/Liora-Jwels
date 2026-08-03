import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, getWishlist, addToWishlist } from "../../services/api";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaHeart } from "react-icons/fa";


function AllProducts() {


const search = useSelector(
(state)=>state.search.search
);


const [quickView,setQuickView] = useState(null);

const [currentPage, setCurrentPage] = useState(1);

const productsPerPage = 8;

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




if(isLoading){

return(
<div className="h-screen flex justify-center items-center">
Loading Products...
</div>
)

}




const filteredProducts = products.filter(product =>
  product.name
    ?.toLowerCase()
    .includes((search || "").toLowerCase())
);

React.useEffect(()=>{
  setCurrentPage(1);
},[search]);

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

alert("Already added to wishlist");

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





{/* Products Grid */}


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