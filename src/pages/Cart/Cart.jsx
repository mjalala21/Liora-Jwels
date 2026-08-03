import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { 
  getCart, 
  getProducts, 
  removeItemfromCart,
   updateCart 
} from "../../services/api";

import { FaTrash, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { getCartProducts } from "../../utilis/calculateTotal";


function Cart() {


  const user = JSON.parse(localStorage.getItem("user"));

  const queryClient = useQueryClient();

  const {
    data: cart = [],
    isLoading: isCartLoading
  } = useQuery({

    queryKey:["cart", user.id],

    queryFn:()=>getCart(user.id)

  });



  const {
    data: products = [],
    isLoading:isProductLoading

  } = useQuery({

    queryKey:["products"],

    queryFn:getProducts

  });



 const removeCartItemMutation = useMutation({
  mutationFn: removeItemfromCart,

  onSuccess: () => {
     console.log("Delete success");
    queryClient.invalidateQueries({
      queryKey: ["cart", user.id]
    });

    toast.success("Item removed from your jewellery bag 🛍️")
  }
});

const updateCartMutation = useMutation({
  mutationFn: ({ id, quantity }) =>
    updateCart(id, { quantity }),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["cart", user.id]
    });
  }
});




  if(isCartLoading || isProductLoading){

    return (

      <div className="
        h-screen
        flex
        justify-center
        items-center
        text-brand-brown
        text-xl
      ">

      Loading your jewellery collection...

      </div>

    )

  }


// const cartProductDetail = getCartProducts(cart, products)

  const cartProduct = cart

  .map(item=>{

    const product = products.find(
      p=>p.id===item.productId
    );


    return {

      ...item,
      product

    };


  })

  .filter(item=>item.product);

// const cartProduct = cartProductDetail.filter(item=> item.product)


  const total = cartProduct.reduce(

    (sum,item)=>
      sum + item.product.price * item.quantity,

      0

  );





  return (


<div className="
  min-h-screen
  bg-[#F8F4EC]
   px-6
  pt-32
  pb-20
">








<div className="
 text-center
 mb-16
">


<h1 className="
 text-6xl
 font-serif
 text-brand-brown
">

Your Jewellery Bag

</h1>


<p className="
 mt-4
 text-gray-600
">

Pieces chosen for your timeless moments

</p>


<div className="
 w-28
 h-[2px]
 bg-brand-gold
 mx-auto
 mt-6
"></div>


</div>






{
cartProduct.length === 0 ?


(
<div className="
 bg-white
 rounded-3xl
 p-20
 text-center
 shadow-xl
">


<FaShoppingBag
className="
mx-auto
text-5xl
text-brand-gold
"
/>


<h2 className="
text-3xl
font-serif
mt-6
text-brand-brown
">

Your cart is empty

</h2>


<p className="
mt-3
text-gray-500
">

Discover our exclusive collections

</p>


</div>
)

:


(

<div className="
max-w-7xl
mx-auto
grid
lg:grid-cols-3
gap-10
">






{/* Cart Items */}



<div className="
lg:col-span-2
flex
flex-col
gap-8
">


{
cartProduct.map(item=>(


<div

key={item.id}

className="
bg-white
rounded-3xl
p-6
shadow-md
flex
flex-col
md:flex-row
gap-8
items-center
hover:shadow-2xl
transition
duration-500
"


>



<Link to={`/products/${item.product.id}`}><img

src={item.product.image}

alt={item.product.name}

className="
w-52
h-52
rounded-2xl
object-cover
"

 /></Link>





<div className="
flex-1
">


<h2 className="
text-2xl
font-serif
text-brand-brown
">

{item.product.name}

</h2>


<p className="
text-brand-gold
mt-2
">

★★★★★

</p>


<p className="
mt-3
text-lg
font-semibold
">

₹ {item.product.price}

</p>



<span
className="
mt-4
flex
justify-between
items-center
gap-6
bg-brand-cream
px-5
py-3
rounded-full
"
>

<button
className="font-bold text-xl"
onClick={() => {

  if (item.quantity > 1) {

    updateCartMutation.mutate({
      id: item.id,
      quantity: item.quantity - 1
    });

  } else {

    removeCartItemMutation.mutate(item.id);

  }

}}
>
-
</button>

<p className="font-semibold">
Quantity : {item.quantity}
</p>

<button
className="font-bold text-xl"
onClick={() =>

  updateCartMutation.mutate({
    id: item.id,
    quantity: item.quantity + 1
  })

}
>
+
</button>

</span>



</div>






<button

onClick={()=>{
   console.log("Delete clicked", item.id)
  removeCartItemMutation.mutate(item.id)}}

className="
bg-red-50
text-red-500
p-4
rounded-full
hover:bg-red-500
hover:text-white
transition
"


>

<FaTrash/>

</button>






</div>


))
}


</div>










{/* Summary */}



<div className="
bg-brand-brown
text-white
rounded-3xl
p-8
h-fit
sticky
top-32
">


<h2 className="
text-3xl
font-serif
text-brand-gold
">

Order Summary

</h2>



<div className="
mt-8
flex
justify-between
text-lg
">

<span>
Items
</span>


<span>
{cartProduct.length}
</span>

</div>




<div className="
border-t
border-white/20
my-6
"></div>




<div className="
flex
justify-between
text-2xl
font-serif
">

<span>
Total
</span>


<span>
₹ {total}
</span>


</div>




<Link to='/checkout'><button 

className="
mt-10
w-full
bg-brand-gold
text-brand-brown
py-4
rounded-full
font-semibold
tracking-widest
hover:scale-105
transition
"

>

Proceed To Checkout

</button></Link>


</div>





</div>

)

}





</div>


  )

}



export default Cart;

