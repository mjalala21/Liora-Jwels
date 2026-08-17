import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaRupeeSign,
  FaShoppingBag,
  FaUsers,
  FaChartLine,

} from "react-icons/fa";



import { getAllOrders } from "../../services/ordersApi";
import { getUsers } from "../../services/userApi";
import { getProducts } from "../../services/productsApi";
import RevenueOverview from "./Analytics/RevenueOverview";
import OrdersOverview from "./Analytics/OrderOverview";
import SalesByCategory from "./Analytics/SalesByCategory";


function AdminAnalytics() {

  const [dateRange, setDateRange] = useState("6months");


  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });


  
  //filter 

  const filteredOrders = useMemo(() => {
  const now = new Date();

  const startDate = new Date(now);

  if (dateRange === "7days") {
    startDate.setDate(now.getDate() - 7);
  }

  if (dateRange === "30days") {
    startDate.setDate(now.getDate() - 30);
  }

  if (dateRange === "6months") {
    startDate.setMonth(now.getMonth() - 6);
  }

  if (dateRange === "year") {
    startDate.setMonth(0);
    startDate.setDate(1);
  }

  startDate.setHours(0, 0, 0, 0);

  return orders.filter((order) => {
    const orderDate = new Date(order.createdAt);

    return orderDate >= startDate && orderDate <= now;
  });
}, [orders, dateRange]);

console.log("ALL ORDERS:", orders);
console.log("FILTERED ORDERS:", filteredOrders);
console.log("DATE RANGE:", dateRange);


  if (ordersLoading || productsLoading || usersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F4EC]">
        <h1 className="text-2xl font-semibold text-[#3B2418]">
          Loading Analytics...
        </h1>
      </div>
    );
  }



    //  BASIC CALCULATIONS

//  const completedOrders = filteredOrders.filter(order=>order.status === "Delivered")
  
//     const totalRevenue = completedOrders.reduce((revenue, order)=>
//     revenue + order.totalAmount, 0
//     )

//   const totalOrders = filteredOrders.length;

//   const totalCustomers = users.filter(
//     (user) => user.role === "user"
//   ).length;

//   const averageOrderValue =
//     completedOrders.length > 0
//       ? Math.round(totalRevenue / totalOrders)
//       : 0;


// =========================
// BASIC CALCULATIONS
// =========================

const completedOrders = filteredOrders.filter(
  (order) => order.status === "Delivered"
);

const totalRevenue = completedOrders.reduce(
  (revenue, order) =>
    revenue + Number(order.totalAmount || 0),
  0
);

const totalOrders = filteredOrders.length;

const totalCustomers = users.filter(
  (user) => user.role === "user"
).length;

const averageOrderValue =
  completedOrders.length > 0
    ? Math.round(totalRevenue / completedOrders.length)
    : 0;
  /* =========================
     PRODUCT INVENTORY
  ========================= */

  const totalProducts = products.length;

  const availableProducts = products.filter(
    (product) => Number(product.stock) > 0
  ).length;

  const outOfStock = products.filter(
    (product) => Number(product.stock) === 0
  ).length;

const filterLabel =
  dateRange === "7days"
    ? "Last 7 Days"
    : dateRange === "30days"
    ? "Last 30 Days"
    : dateRange === "6months"
    ? "Last 6 Months"
    : "This Year";





  return (
    <div className="min-h-screen bg-[#F8F4EC] p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row justify-between md:items-end gap-5 mb-10">

        <div>

          <h1 className="text-5xl font-serif text-[#3B2418] tracking-wide">
            Analytics
          </h1>

          <p className="mt-3 text-gray-500 text-lg">
            Understand your LIORA business performance
          </p>

        </div>


        <select
  value={dateRange}
  onChange={(e) => setDateRange(e.target.value)}
  className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418] cursor-pointer"
>
  <option value="6months">Last 6 Months</option>
  <option value="30days">Last 30 Days</option>
  <option value="7days">Last 7 Days</option>
  <option value="year">This Year</option>
</select>

      </div>


      {/* ================= KPI CARDS ================= */}

{/* ================= KPI CARDS ================= */}

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-10">

  {/* ================= REVENUE ================= */}

  <div className="bg-white rounded-3xl p-7 shadow-lg">

    <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">
      <FaRupeeSign className="text-[#D4AF37] text-2xl" />
    </div>

    <h2 className="text-3xl font-bold mt-6 text-[#3B2418]">
      ₹{totalRevenue.toLocaleString("en-IN")}
    </h2>

    <p className="text-gray-500 mt-2">
      Revenue — {filterLabel}
    </p>

  </div>


  {/* ================= ORDERS ================= */}

  <div className="bg-white rounded-3xl p-7 shadow-lg">

    <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">
      <FaShoppingBag className="text-[#D4AF37] text-2xl" />
    </div>

    <h2 className="text-3xl font-bold mt-6 text-[#3B2418]">
      {totalOrders}
    </h2>

    <p className="text-gray-500 mt-2">
      Orders — {filterLabel}
    </p>

  </div>


  {/* ================= CUSTOMERS ================= */}

  <div className="bg-white rounded-3xl p-7 shadow-lg">

    <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">
      <FaUsers className="text-[#D4AF37] text-2xl" />
    </div>

    <h2 className="text-3xl font-bold mt-6 text-[#3B2418]">
      {totalCustomers}
    </h2>

    <p className="text-gray-500 mt-2">
      Total Customers
    </p>

  </div>


  {/* ================= AVERAGE ORDER ================= */}

  <div className="bg-white rounded-3xl p-7 shadow-lg">

    <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">
      <FaChartLine className="text-[#D4AF37] text-2xl" />
    </div>

    <h2 className="text-3xl font-bold mt-6 text-[#3B2418]">
      ₹{averageOrderValue.toLocaleString("en-IN")}
    </h2>

    <p className="text-gray-500 mt-2">
      Average Order — {filterLabel}
    </p>

  </div>

</div>


      {/* ================= REVENUE CHART ================= */}

       <div className="grid grid-cols-1 xl:grid-cols-1 gap-8 mb-10"> 


<RevenueOverview orders={filteredOrders} dateRange={dateRange} />


     </div>
      {/* ================= ORDERS + CATEGORY ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">


        {/* Orders Chart */}

<OrdersOverview orders={filteredOrders} dateRange={dateRange}/>

        {/* Category Chart */}




        
<SalesByCategory orders={filteredOrders} dateRange={dateRange}/>

      </div>


     
      {/* ================= INVENTORY ================= */}

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

        <h2 className="text-2xl font-serif text-[#3B2418] mb-7">
          Inventory Overview
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


          <div className="bg-[#F8F4EC] rounded-2xl p-6">

            <p className="text-gray-500">
              Total Products
            </p>

            <h3 className="text-3xl font-bold text-[#3B2418] mt-2">
              {totalProducts}
            </h3>

          </div>


          <div className="bg-green-50 rounded-2xl p-6">

            <p className="text-gray-500">
              Available Products
            </p>

            <h3 className="text-3xl font-bold text-green-700 mt-2">
              {availableProducts}
            </h3>

          </div>


          <div className="bg-red-50 rounded-2xl p-6">

            <p className="text-gray-500">
              Out of Stock
            </p>

            <h3 className="text-3xl font-bold text-red-600 mt-2">
              {outOfStock}
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminAnalytics;