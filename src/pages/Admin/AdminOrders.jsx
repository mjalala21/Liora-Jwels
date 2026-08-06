import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllOrders} from '../../services/api'

function AdminOrders() {


const {data : orders=[], isLoading} = useQuery({
    queryKey : ['orders'], 
    queryFn : getAllOrders
})

console.log(orders)
 if(isLoading){
    <p>orders Loading...</p>
 }


  return (
    <div>
    <div>Total Number of Orders</div>
     <p>{orders.length}</p>

    </div>
  )
}

export default AdminOrders