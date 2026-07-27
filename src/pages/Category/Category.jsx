import React from 'react'
import { useParams } from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'
import { getProducts } from '../../services/api'

function Category() {

    const {category} = useParams()
    
    const {data, isLoading, error} = useQuery({
        queryKey: ["products", category],
        queryFn : getProducts
    })
    
    if(isLoading){
      return <p>Loding...</p>
    }

    if(error){
      return <p>{error.message}</p>
    }
 
    const filteredProducts = data.filter(product=>product.category === category)

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-10'>
        {filteredProducts.map(product=>
            <div key={product.id}>
                <p>{product.name}</p>
                <img src={product.image} alt="" />
                <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
        )}
    </div>
  )
}

export default Category