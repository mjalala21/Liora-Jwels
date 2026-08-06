import React from "react";
import { useState } from "react";
import { 
  useQuery,
  useMutation,
  useQueryClient
} from "@tanstack/react-query";


import {
 getWishlist,
 getProducts,
 removeFromWishlist,
 addToCart,
 getCart,
 updateCart
} from "../../services/api";


import {
 FaHeart,
 FaTrash,
 FaShoppingBag
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BackButton from "../../components/layout/BackButton";



function Wishlist(){


const user = useSelector((state) => state.user.user);

const[quantity, setQuantity]= useState(1)



const queryClient = useQueryClient();




const {
 data:wishlist=[],
 isLoading:wishlistLoading

}=useQuery({

queryKey:["wishlist",user?.id],

queryFn:()=>getWishlist(user.id)

});





const {
data:products=[]

}=useQuery({

queryKey:["products"],

queryFn:getProducts

});


const{
  data : cart=[]
}= useQuery({
  queryKey : ['cart', user?.id],
  queryFn : ()=>getCart(user.id)
})



const removeWishlistMutation = useMutation({

mutationFn:removeFromWishlist,


onSuccess:()=>{
if(user){
queryClient.invalidateQueries({

queryKey:["wishlist",user.id]

});
}

}

});






const addCartMutation = useMutation({

mutationFn:(item)=>addToCart(item),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["cart", user.id],
    });
  }

});

const updateCartMutation = useMutation({
  mutationFn : ({itemId, updatedData})=>updateCart(itemId, updatedData),

  onSuccess : ()=>
    queryClient.invalidateQueries({
      queryKey : ['cart', user?.id]
    })
})



if(wishlistLoading){

return (

<div className="
h-screen
flex
items-center
justify-center
font-serif
text-2xl
">

Loading Wishlist...

</div>

)

}





const wishlistProducts = wishlist.map(item=>{

const product = products.find(p=>
  String(user.id) === String(item.userId) &&
String(p.id)===String(item.productId)
);


return{

...item,
product

}


}).filter(item=>item.product);


function handleAddCart(item){
  
  const checkCart = cart.find(cartItem=>
    String(user.id)===String(cartItem.userId) &&
    String(item.productId)===String(cartItem.productId)
   )

 
  console.log(checkCart)


if(checkCart){  



  updateCartMutation.mutate(
    {
      itemId : checkCart.id,
      updatedData : { 
        quantity : checkCart.quantity + quantity}
    }
  )
  return;
}

const cartedItem = {
  userId : user.id,
  productId : item.productId,
  quantity : quantity
}
addCartMutation.mutate(cartedItem,{
  onSuccess : ()=>{
       removeWishlistMutation.mutate(item.id)
  }
})
  
}



return (

<div className="
min-h-screen
bg-[#F8F4EC]
pt-25
px-10
pb-20
">


<BackButton/>


{/* HEADER */}


<div className="
text-center
mb-16
">


<FaHeart
className="
mx-auto
text-brand-gold
text-5xl
"
/>



<h1 className="
text-6xl
font-serif
text-brand-brown
mt-6
">

Your Wishlist

</h1>



<p className="
text-gray-500
mt-4
">

Your favourite jewellery pieces

</p>



<div className="
w-28
h-[2px]
bg-brand-gold
mx-auto
mt-6
">

</div>


</div>






{
wishlistProducts.length===0 ?

(

<div className="
bg-white
rounded-3xl
p-20
text-center
shadow-xl
">


<h2 className="
text-3xl
font-serif
text-brand-brown
">

Your wishlist is empty

</h2>


<p className="
mt-4
text-gray-500
">

Explore our exclusive collections

</p>


</div>

)

:


(


<div className="
grid
md:grid-cols-2
xl:grid-cols-4
gap-10
">


{

wishlistProducts.map(item=>(


<div
key={item.id}
className="
bg-white
rounded-[35px]
overflow-hidden
shadow-lg
hover:shadow-2xl
transition
duration-500
group
"

>



<div className="
relative
">

<Link to={`/products/${item.product.id}`}>
<img

src={item.product.image}

alt={item.product.name}

className="
h-[350px]
w-full
object-cover
group-hover:scale-110
transition
duration-700
"

/>
</Link>



<button

onClick={()=>removeWishlistMutation.mutate(item.id)}

className="
absolute
top-5
right-5
bg-white
p-4
rounded-full
text-red-500
shadow
hover:bg-red-500
hover:text-white
transition
"

>

<FaTrash/>

</button>


</div>






<div className="
p-6
text-center
">


<h2 className="
font-serif
text-2xl
text-brand-brown
">

{item.product.name}

</h2>




<p className="
text-brand-gold
mt-3
">

★★★★★

</p>



<p className="
text-xl
font-semibold
mt-3
">

₹ {item.product.price}

</p>





<button

onClick={()=>handleAddCart(item)}

className="
mt-6
w-full
bg-brand-brown
text-white
py-3
rounded-full
flex
items-center
justify-center
gap-3
hover:bg-brand-gold
hover:text-brand-brown
transition
"

>

<FaShoppingBag/>

Add To Cart

</button>



</div>



</div>


))

}


</div>


)


}




</div>

)


}


export default Wishlist;