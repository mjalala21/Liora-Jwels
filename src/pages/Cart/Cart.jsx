import React from 'react'
import {useQuery} from '@tanstack/react-query'
import { getCart, getProducts } from '../../services/api'

function Cart() {

  const user = JSON.parse(localStorage.getItem("user"))



  const{data : cart =[], isCartLoading} = useQuery({
    queryKey : ["cart", user.id],
    queryFn : ()=>getCart(user.id)
  })

  if(isCartLoading){
    return <p>Loading...</p>
  }

  const {data : products=[], isProductLoading}  = useQuery({
     queryKey : ["products"],
     queryFn : getProducts
  })

  if(isProductLoading){
    return <p>Loading...</p>
  }

const cartProduct = cart.map(item=>{
  const product = products.find(p=>p.id===item.productId);


  return {
    ...item,
    product
  };
})




  // const product = products.filter(p=>p.id===)

  // const cartItem = data.filter(cart=>cart.userId===user.id)


  return (
    <div>
      {/* <div>{cart.map(item=><p>{item.productId}</p>)}</div> */}
     
     return (
  <div>
    {cartProduct.map(item => (
      <div key={item.id}>
        <img src={item.product.image} alt={item.product.name} />
        <h2>{item.product.name}</h2>
        <p>{item.product.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>
    ))}
  </div>
);
    </div>
  
  )
}

export default Cart

