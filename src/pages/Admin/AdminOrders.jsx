
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
import OrdersTable from "./components/OrdersTable";
import NoItemsFound from "./components/NoItemsFound";

function AdminOrders() {

  const queryClient = useQueryClient()

  const[statusFilter, setSatatusFilter] = useState("All Status")
  const[paymentFilter, setPaymentFilter] = useState("All Payment")

  


  const {
    data: orders = [],
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });


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

 




  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl text-[#3B2418] font-semibold">
          Loading Orders...
        </h1>
      </div>
    );
  }



  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  )

  const completedOrders = deliveredOrders.length

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

    const totalRevenue = deliveredOrders.reduce((revenue, order)=>
    revenue + order.totalAmount, 0
    )

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

      {filteredOrders.length<=0 ? <NoItemsFound/> :  <OrdersTable orders = {filteredOrders}  />}

     
    </div>
  );
}

export default AdminOrders;