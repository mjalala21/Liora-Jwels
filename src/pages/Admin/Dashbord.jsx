import React from "react";
import {
  FaShoppingBag,
  FaUsers,
  FaBoxOpen,
  FaRupeeSign,
} from "react-icons/fa";

import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/ordersApi";
import { getProducts } from "../../services/productsApi";
import { getUsers } from "../../services/userApi";
import SalesOverview from "./components/SalesOverview";
import TopSelling from "./components/TopSelling";


function Dashboard() {

    const{ data: orders =[], isOrderLoading} = useQuery({
        queryKey : ['orders'],
        queryFn : getAllOrders
    })

    const{data : products=[], isProductsLoading} = useQuery({
        queryKey : ['products'],
        queryFn : getProducts
    })

    const {data : users=[], isUsersLoading} = useQuery({
        queryKey : ['users'],
        queryFn : getUsers
    })

    if(isOrderLoading || isProductsLoading || isUsersLoading){
        return <h1>Loading...</h1>
    }
  
    const totalRevenue = orders.reduce((revenue, order)=>
    revenue + order.totalAmount, 0
    )

   console.log(totalRevenue.toLocaleString('en-IN'))

   const recentOrders = orders.slice(-4).reverse()

   console.log(recentOrders)
    

  return (
    <div className="min-h-screen bg-[#F8F4EC] p-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-serif text-[#3B2418]">
          Welcome Back, Admin 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening in your LIORA store today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-[#D4AF37]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Revenue</p>
              <h2 className="text-3xl font-bold text-[#3B2418] mt-2">
                <p>₹{totalRevenue.toLocaleString('en-IN')}</p>
              </h2>
            </div>

            <div className="bg-[#D4AF37]/20 p-4 rounded-full">
              <FaRupeeSign className="text-[#D4AF37] text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-[#D4AF37]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Orders</p>
              <h2 className="text-3xl font-bold text-[#3B2418] mt-2">
                {orders.length}
              </h2>
            </div>

            <div className="bg-[#D4AF37]/20 p-4 rounded-full">
              <FaShoppingBag className="text-[#D4AF37] text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-[#D4AF37]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Products</p>
              <h2 className="text-3xl font-bold text-[#3B2418] mt-2">
                {products.length}
              </h2>
            </div>

            <div className="bg-[#D4AF37]/20 p-4 rounded-full">
              <FaBoxOpen className="text-[#D4AF37] text-2xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border-l-4 border-[#D4AF37]">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Customers</p>
              <h2 className="text-3xl font-bold text-[#3B2418] mt-2">
                {users.length}
              </h2>
            </div>

            <div className="bg-[#D4AF37]/20 p-4 rounded-full">
              <FaUsers className="text-[#D4AF37] text-2xl" />
            </div>
          </div>
        </div>

      </div>

      {/* Sales + Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-10">

        {/* Sales Chart Placeholder */}
         <SalesOverview />

        {/* Top Products */}
        <TopSelling />

      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-3xl shadow-lg p-8 mt-10">

        <h2 className="text-2xl font-serif text-[#3B2418] mb-6">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="border-b">

              <tr className="text-left text-[#3B2418]">

                <th className="py-3">Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

                {recentOrders.map(order=>{

                    const customer = users.find(user=>user.id===order.userId)

                    return (

                    <tr className="border-b hover:bg-[#F8F4EC]">
                         <td className="py-4">{order.id}</td>
                         <td>{customer?.name}</td>
                         <td>{order.totalAmount}</td>
                         <td>
                            <span className="bg-[#D4AF37]/20 text-[#8B6B25] px-4 py-1 rounded-full text-sm">
                            {order.status}
                          </span>
                            </td>

                    </tr>
                    )
 } )
                
                }

            
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;