import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../services/api'

function AdminProducts() {

const {data : products=[], isLoading} = useQuery({
  queryKey : ['products'],
  queryFn : getProducts
})

if(isLoading){
  return <h1>Loading...</h1>
}

  return (
    <div>
      <div>
        total products
      </div>
      <div>{products.length}</div>
    </div>
  )
}

export default AdminProducts