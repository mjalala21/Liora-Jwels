import React from 'react'
import { getProducts} from '../../services/api'
import { useState, useEffect } from 'react'
import { useQuery,useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

function Products() {



    const {data, isLoading, error} = useQuery({
        queryKey : ['products'],
        queryFn : getProducts
    })

    if(isLoading){
        return <p>Loading...</p>

    }

    if(error){
        return <p>{error.message}</p>
    }

    // const[products, setProducts] = useState([])

    // useEffect(()=>{
    //     const fetchData = async ()=>{
    //         const data = await getProducts();
    //         setProducts(data)

    //     }
    //     fetchData()
    // },[])
  return (
<div>

    <div className='flex gap-20 p-10'>
 {data.filter(product=>product.category === "Ring" && product.id)
      .slice(0,4)
      .map(product=> 
      <div key={product.id}>
        <p>{product.id}</p>
        <img src={product.image} className="w-\[300px]/ h-\[400px]\ object-cover rounded-l" />
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>

        </div>
     )
      }
        <Link to='/products/category/Ring'><button>View all</button></Link>
   </div>
       <div className='flex gap-20 p-10'>
 {data.filter(product=>product.category === "Bracelet" && product.id)
      .slice(0,4)
      .map(product=> 
      <div  key={product.id}>
        <p>{product.id}</p>
        <img src={product.image} className="w-\[300px]/ h-\[400px]\ object-cover rounded-l"/>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>

        </div>
     )
      }
        <Link to='/products/category/Bracelet'><button>View all</button></Link>
   </div>
       <div className='flex gap-20 p-10'>
 {data.filter(product=>product.category === "Necklace" && product.id)
      .slice(0,4)
      .map(product=> 
      <div  key={product.id}>
        <p>{product.id}</p>
        <img src={product.image} className="w-\[300px]/ h-\[400px]\ object-cover rounded-l"/>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>

        </div>
     )
      }
       <Link to='/products/category/Necklace'> <button>View all</button></Link>
   </div>
       <div className='flex gap-20 p-10'>
 {data.filter(product=>product.category === "Bangle" && product.id)
      .slice(0,4)
      .map(product=> 
      <div  key={product.id}>
        <p>{product.id}</p>
        <img src={product.image} className="w-\[300px]/ h-\[400px]\ object-cover rounded-l"/>
        <p>{product.name}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>

        </div>
     )
      }
       <Link to='/products/category/Bangle'><button>View all</button></Link> 
   </div>
   </div>
   )
}

export default Products 