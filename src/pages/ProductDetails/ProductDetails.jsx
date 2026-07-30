import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@tanstack/react-query'
import { addToCart, getProducts, getCart} from '../../services/api'

function ProductDetails() {

  const navigate = useNavigate()

    const addCartMutation = useMutation({
        mutationFn : addToCart
    })

 const {id} = useParams()
    const {data : products, isLoading} = useQuery({
        queryKey : ['product', id],
        queryFn : getProducts
    })

    const {data : cart, isCartLoading } = useQuery({
  queryKey : ['cart'],
  queryFn : getCart
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

     console.log(product)

function handleAddCart(){

  console.log("clicked user")
     
     const user = JSON.parse(localStorage.getItem("user"))

     

    const checkCart = cart.find(item => {
 
      

  return (

    item.userId ===user.id &&
    item.productId === product.id
  );
});



     if(checkCart){
      return 
     }
  

  const cartItem ={
      userId: user.id,
    productId: product.id,
    quantity: 1
  }

  addCartMutation.mutate(cartItem)
navigate('/cart')
 
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