// import React from 'react'
// import { useQuery } from '@tanstack/react-query'
// // import { getAllOrders} from '../../services/api'
// import { getAllOrders } from '../../services/ordersApi'

// function AdminOrders() {


// const {data : orders=[], isLoading} = useQuery({
//     queryKey : ['orders'], 
//     queryFn : getAllOrders
// })

// console.log(orders)
//  if(isLoading){
//     <p>orders Loading...</p>
//  }


//   return (
//     <div>
//     <div>Total Number of Orders</div>
//      <p>{orders.length}</p>

//     </div>
//   )
// }

// export default AdminOrders

import React ,{useState, useCallback, useMemo}from "react";
import { useQuery , useMutation} from "@tanstack/react-query";
import {
  FaSearch,
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";

import { getAllOrders, updateOrderStatus } from '../../services/ordersApi'
import { useQueryClient } from "@tanstack/react-query";
import useSearch from "../../hooks/useSearch";
import SearchBar from "../../components/layout/SearchBar";
import usePagination from "../../hooks/usePagination";
import Pagination from "./components/Pagination";
import OrderView from "./components/OrderView";

function AdminOrders() {

  const queryClient = useQueryClient()

  const[statusFilter, setSatatusFilter] = useState("All Status")
  const[paymentFilter, setPaymentFilter] = useState("All Payment")

  const[selectedOrder, setSelectedOrder] = useState(null)


  const {
    data: orders = [],
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });
  const orderStatusMutation = useMutation({
    mutationFn : ({orderId, status})=>updateOrderStatus(orderId, status),

    onSuccess : ()=>{
      queryClient.invalidateQueries({
      queryKey: ['orders']
      })
    }
  })

  const getOrderSearchValue = useCallback((order)=>
    ` ${order.shippingAddress?.fullName || ""  }
     ${order.id || ""}
     ${order.shippingAddress?.city}
     ${order.paymentMethod || ""}
     ${order.status || ""}
   `,[]
  ) 
  const { search, setSearch, searchedData : searchedOrders } = useSearch(orders, getOrderSearchValue);

   const paymentFilteredOrders = useMemo(()=>{
      return searchedOrders.filter(order=>
        paymentFilter === "All Payment" ?
        order :
        paymentFilter === "COD" ? 
        order.paymentMethod ==="cod":
    
        order.paymentMethod === "card"

      )
   
   },[searchedOrders, paymentFilter])


  const filteredOrders = useMemo(()=>{
     return  paymentFilteredOrders.filter(order=>
    statusFilter === "All Status" ? 
    order :
    statusFilter==="Pending" 
    ? order.status === "Pending": 
    statusFilter==="Processing" ?
    order.status==="Processing" :
    statusFilter === "Shipped" ?
    order.status==="Shipped":
    statusFilter === "Delivered" ? 
    order.status ==="Delivered":
    order.status==="Cancelled"
  )
  },[paymentFilteredOrders, statusFilter])

 
  const {
    page,
    setPage,
    totalPages,
    currentItems,
    nextPage,
    previousPage,
  } = usePagination(filteredOrders, 5);



  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl text-[#3B2418] font-semibold">
          Loading Orders...
        </h1>
      </div>
    );
  }

  function handleStatusChange(orderId, status){
     
   orderStatusMutation.mutate({
    orderId,
    status
   })

  }

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.totalAmount),
    0
  );

  return (
    <div className="min-h-screen bg-[#F8F4EC] p-8">

      {/* Header */}

      <div className="flex justify-between items-end mb-10">

        <div>
          <h1 className="text-5xl font-serif text-[#3B2418] tracking-wide">
            Orders
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Manage and monitor your jewellery orders
          </p>
        </div>

      </div>


      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-10">

        {/* Total Orders */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">
            <FaShoppingBag className="text-[#D4AF37] text-2xl" />
          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {orders.length}
          </h2>

          <p className="text-gray-500 mt-2">
            Total Orders
          </p>

        </div>


        {/* Pending */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-yellow-50 flex items-center justify-center">
            <FaClock className="text-yellow-500 text-2xl" />
          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {pendingOrders}
          </h2>

          <p className="text-gray-500 mt-2">
            Pending Orders
          </p>

        </div>


        {/* Completed */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
            <FaCheckCircle className="text-green-500 text-2xl" />
          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {completedOrders}
          </h2>

          <p className="text-gray-500 mt-2">
            Completed
          </p>

        </div>


        {/* Cancelled */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center">
            <FaTimesCircle className="text-red-500 text-2xl" />
          </div>

          <h2 className="text-4xl font-bold mt-6 text-[#3B2418]">
            {cancelledOrders}
          </h2>

          <p className="text-gray-500 mt-2">
            Cancelled
          </p>

        </div>

      </div>


      {/* Revenue */}

      <div className="bg-[#3B2418] rounded-3xl p-7 mb-10 shadow-xl">

        <p className="text-white/60">
          Total Revenue
        </p>

        <h2 className="text-4xl font-serif text-[#D4AF37] mt-2">
          ₹{totalRevenue.toLocaleString("en-IN")}
        </h2>

      </div>


      {/* Search */}

      <SearchBar
        search={search}
        setSearch={setSearch}
      />


      {/* Filters */}

      <div className="flex flex-wrap gap-4 mb-8">

        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]"
        onChange={(e)=>setSatatusFilter(e.target.value)}
        >

          <option value="All Status">All Status</option>
          <option value = "Pending">Pending</option>
          <option value = "Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Completed</option>
          <option value="Cancelled">Cancelled</option>

        </select>


        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]"
        onChange={(e)=>setPaymentFilter(e.target.value)}
        >

          <option value="All Payment">All Payments</option>
          <option vlaue="COD">COD</option>
          <option value="Card">Card</option>

        </select>

      </div>


      {/* Orders Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-[#F8F4EC] border-b">

              <tr className="text-left text-[#3B2418]">

                <th className="px-6 py-5">
                  Order ID
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Date
                </th>

                <th>
                  Items
                </th>

                <th>
                  Amount
                </th>

                <th>
                  Payment
                </th>

                <th>
                  Status
                </th>

                <th className="text-center">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {currentItems.map((order) => (

                <tr
                  key={order.id}
                  className="border-b hover:bg-[#FDFBF8] transition-all"
                >

                  {/* Order ID */}

                  <td className="px-6 py-5">

                    <span className="font-semibold text-[#3B2418]">
                      #{order.id.slice(0, 8)}
                    </span>

                  </td>


                  {/* Customer */}

                  <td>

                    <div>

                      <p className="font-semibold text-[#3B2418]">
                        {order.shippingAddress?.fullName}
                      </p>

                      <p className="text-sm text-gray-400">
                        {order.shippingAddress?.city}
                      </p>

                    </div>

                  </td>


                  {/* Date */}

                  <td className="text-gray-600">

                    {new Date(
                      order.createdAt
                    ).toLocaleDateString("en-IN")}

                  </td>


                  {/* Items */}

                  <td>

                    <span className="bg-[#F8F4EC] px-3 py-1 rounded-full text-sm">
                      {order.items?.length} Items
                    </span>

                  </td>


                  {/* Amount */}

                  <td className="font-bold text-[#D4AF37]">

                    ₹
                    {Number(
                      order.totalAmount
                    ).toLocaleString("en-IN")}

                  </td>


                  {/* Payment */}

                  <td>

                    <span className="capitalize text-gray-600">
                      {order.paymentMethod}
                    </span>

                  </td>


                  {/* Status */}

                  <td>

                 

                    <select
                      value={order.status}
                      onChange={(e)=>handleStatusChange(order.id, e.target.value)}
                      className={`border rounded-2xl px-3 py-2 font-medium
                        ${ 
                          order.status==="Pending" 
                          ?"bg-yellow-50 text-yellow-700"
                          :order.status ==="Processing"
                          ? " bg-blue-50 text-blue-700"
                          :order.status === "Shipped"
                          ? "bg-purple-50 text-purple-700"
                          :order.status==="Delivered"
                          ?"bg-green-50 text-green-700"
                          :"bg-red-50 text-red-700"
                        }
                      `}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>


                    </select>

                  </td>


                  {/* Action */}

                  <td>

                    <div className="flex justify-center">

                      <button
                        className="w-10 h-10 rounded-xl bg-[#F8F4EC] hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center"
                        onClick={()=>setSelectedOrder(order)}
                      >
                        <FaEye />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* View Order */}

        {
          selectedOrder && <OrderView order = {selectedOrder} onClose = {()=>setSelectedOrder(null)}/>
        }

        {/* Pagination */}

        <Pagination
          page={page}
          setPage={setPage}
          totalPages={totalPages}
          nextPage={nextPage}
          previousPage={previousPage}
        />

      </div>

    </div>
  );
}

export default AdminOrders;