import React from 'react'
import {useMutation, useQuery} from '@tanstack/react-query'
import { getCart, getProducts, removeItemfromCart } from '../../services/api'

function Cart() {

  const user = JSON.parse(localStorage.getItem("user"))



  const{data : cart =[], isCartLoading} = useQuery({
    queryKey : ["cart", user.id],
    queryFn : ()=>getCart(user.id)
  })
   const {data : products=[], isProductLoading}  = useQuery({
     queryKey : ["products"],
     queryFn : getProducts
  })
 const removeCartItemMutation = useMutation({
  mutationFn : removeItemfromCart
 })


  if(isCartLoading){
    return <p>Loading...</p>
  }

 

  if(isProductLoading){
    return <p>Loading...</p>
  }

const cartProduct = cart
.map(item=>{
  const product = products.find(p=>p.id===item.productId)
  return {
    ...item,
    product
  };
})
.filter(item=>item.product)



  return (
    
     
     
  <div>   
  <div>
    {cartProduct.map(item => (
      <div key={item.id}>
        <img src={item.product.image} alt={item.product.name} />
        <h2>{item.product.name}</h2>
        <p>{item.product.price}</p>
        <p>Quantity: {item.quantity}</p>
        <button onClick={()=>removeCartItemMutation.mutate(item.id)}>Delete</button>
      </div>
    ))}
  </div>

  </div>

    
  
  )
}

export default Cart

