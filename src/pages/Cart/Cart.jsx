import React from 'react'
import {useQuery} from '@tanstack/react-query'

function Cart() {

  const user = JSON.parse(localStorage.getItem("user"))

  const{data} = useQuery({
    queryKey : ["cart", id],
    queryFn : getCart
  })


  return (
    <div>Cart</div>
  )
}

export default Cart