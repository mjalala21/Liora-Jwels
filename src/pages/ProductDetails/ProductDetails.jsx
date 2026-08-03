import React from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { addToCart, getProducts, getCart,  getWishlist, addToWishlist, removeFromWishlist, updateCart} from '../../services/api'
import { FaHeart } from "react-icons/fa";

import ProductHero from './productHero'
import ProductServices from './productServices'
import RelatedProducts from './relatedProducts'
import ProductReviewsFAQ from './ProductReviewFAQ'
import { useSelector } from 'react-redux'


function ProductDetails() {

  const navigate = useNavigate()
const queryClient = useQueryClient()
   const {id} = useParams()

   const user = useSelector((state) => state.user.user);

    const[quantity, setQuantity] = useState(1)

    const {data : products = [], isLoading} = useQuery({
        queryKey : ['product', id],
        queryFn : getProducts
    })

    const {data : cart, isCartLoading } = useQuery({
  queryKey : ['cart', user?.id],
  queryFn : ()=>getCart(user.id),
  enabled : !!user
})

const {data:wishlist=[]} = useQuery({

  queryKey:["wishlist", user?.id],

  queryFn:()=>getWishlist(user.id),

  enabled : !!user

})

    const addCartMutation = useMutation({
        mutationFn : addToCart
    })

    const updateCartMutation = useMutation({
  mutationFn: ({ itemId, updatedData }) =>
    updateCart(itemId, updatedData),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["cart", user.id],
    });
  },
});

const wishlistMutation = useMutation({

  mutationFn:addToWishlist,

  onSuccess:()=>{

    queryClient.invalidateQueries({
      queryKey:["wishlist", user.id]
    })

  }

})

const removeWishlistMutation = useMutation({

  mutationFn: removeFromWishlist,

  onSuccess:()=>{

    queryClient.invalidateQueries({
      queryKey:["wishlist", user.id]
    })

  }

})


  
   
    if(isLoading){
    return <p>Loading...</p>
  }

  if(isCartLoading){
    return <p>Loading...</p>
  }


const product = products.find(p => String(p.id) === String(id));
     if(!product){
        return <p>page not found</p>
     }

function handleWishlist(product){

  if(!user){
    navigate('/login')
  }

const existingItem = wishlist.find(item=>

String(item.userId) === String(user.id)
&&
String(item.productId) === String(product.id)

)
  


  // REMOVE FROM WISHLIST

  if(existingItem){

    removeWishlistMutation.mutate(existingItem.id)

    return;

  }



  // ADD TO WISHLIST


  const wishlistItem = {

    userId:user.id,

    productId:product.id

  }


  wishlistMutation.mutate(wishlistItem)


}   

function handleAddCart() {

  
  if(!user){
    navigate('/login')
  } 

  const checkCart = cart.find(
    (item) =>
      String(item.userId) === String(user.id) &&
      String(item.productId) === String(product.id)
  );

  // Product already in cart
  if (checkCart) {
    updateCartMutation.mutate({
      itemId: checkCart.id,
      updatedData: {
        quantity: checkCart.quantity + quantity,
      },
    });

    return;
  }

  // New product
  addCartMutation.mutate(
    {
      userId: user.id,
      productId: product.id,
      quantity,
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["cart", user.id],
        });
      },
    }
  );
}

  function handleBuyNow(){

    
  if(!user){
    navigate('/login')
  }

const buyNowItem = {

 userId:user.id,

 productId:product.id,

 quantity:1

};


localStorage.setItem(
 "buyNowItem",
 JSON.stringify(buyNowItem)
);


navigate("/checkout");


  }

//   return (
//     <div>
//         <h1>Product Details</h1>
//         <img src={product.image} alt={product.name}/>

//       <h2>{product.name}</h2>

//       <p>{product.description}</p>

//       <p>{product.price}</p>
//       <button className='px-4 py-2 bg-blue-300 text-white rounded-lg' onClick={handleAddCart}>Add to Cart</button>

//     </div>
//   )
// }

// export default ProductDetails



// function ProductDetails() {

  return (
   <>
   <ProductHero
  product={product}
  quantity={quantity}
  setQuantity={setQuantity}
  handleAddCart={handleAddCart}
   handleBuyNow={handleBuyNow}
  handleWishlist={handleWishlist}
  isWishlisted={wishlist.some(
    item => String(item.productId) === String(product.id)
  )}
/>
   <ProductServices product = {product}/>
   <RelatedProducts product={product} products={products}/>
   <ProductReviewsFAQ/>
   </>
  )
}

export default ProductDetails