import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { addToCart, getProducts } from '../../services/api'

function ProductDetails() {

    const addCartMutation = useMutation({
        mutationFn : addToCart
    })

 const {id} = useParams()
    const {data, isLoading} = useQuery({
        queryKey : ['product', id],
        queryFn : getProducts
    })
   
    if(isLoading){
    return <p>Loading...</p>
  }



  const product = data.find(p=>p.id===id)

     if(!product){
        return <p>page not found</p>
     }

function handleAddCart(){
     
     const user = JSON.parse(localStorage.getItem("user"))
  

  const cartItem ={
      userId: user.id,
    productId: product.id,
    quantity: 1
  }

  addCartMutation.mutate(cartItem)
  }

  return (
    <div>
        <h1>Product Details</h1>
        <img src={product.image} alt={product.name}/>

      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <p>{product.price}</p>
      <button className='px-4 py-2 bg-blue-300 text-white rounded-lg' onClick={handleAddCart}>Add to Cart</button>

    </div>
  )
}

export default ProductDetails