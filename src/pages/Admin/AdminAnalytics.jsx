import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaRupeeSign,
  FaShoppingBag,
  FaUsers,
  FaChartLine,

} from "react-icons/fa";



// import { getOrders, getUsers } from "../../services/api";
import { getOrders } from "../../services/ordersApi";
import { getUsers } from "../../services/userApi";
import { getProducts } from "../../services/productsApi";
import RevenueOverview from "./Analytics/RevenueOverview";
import OrdersOverview from "./Analytics/OrderOverview";
import SalesByCategory from "./Analytics/SalesByCategory";
import TopSellingProducts from "./Analytics/TopSellingProducts";
import OrderStatus from "./Analytics/OrderStatus";

function AdminAnalytics() {


  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });


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

 const completedOrders = orders.filter(order=>order.status === "Delivered")
  
    const totalRevenue = completedOrders.reduce((revenue, order)=>
    revenue + order.totalAmount, 0
    )

  const totalOrders = orders.length;

  const totalCustomers = users.filter(
    (user) => user.role === "user"
  ).length;

  const averageOrderValue =
    totalOrders > 0
      ? Math.round(totalRevenue / totalOrders)
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


        <select className="bg-white border border-gray-200 rounded-xl px-5 py-3 outline-none text-[#3B2418]">

          <option>Last 6 Months</option>
          <option>Last 30 Days</option>
          <option>Last 7 Days</option>
          <option>This Year</option>

        </select>

      </div>


      {/* ================= KPI CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-7 mb-10">


        {/* Revenue */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <FaRupeeSign className="text-[#D4AF37] text-2xl" />

          </div>

          <h2 className="text-3xl font-bold mt-6 text-[#3B2418]">

            ₹{totalRevenue.toLocaleString("en-IN")}

          </h2>

          <p className="text-gray-500 mt-2">
            Total Revenue
          </p>

        </div>


        {/* Orders */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <FaShoppingBag className="text-[#D4AF37] text-2xl" />

          </div>

          <h2 className="text-3xl font-bold mt-6 text-[#3B2418]">

            {totalOrders}

          </h2>

          <p className="text-gray-500 mt-2">
            Total Orders
          </p>

        </div>


        {/* Customers */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <FaUsers className="text-[#D4AF37] text-2xl" />

          </div>

          <h2 className="text-3xl font-bold mt-6 text-[#3B2418]">

            {totalCustomers}

          </h2>

          <p className="text-gray-500 mt-2">
            Customers
          </p>

        </div>


        {/* Average Order */}

        <div className="bg-white rounded-3xl p-7 shadow-lg">

          <div className="w-14 h-14 rounded-full bg-[#F8F4EC] flex items-center justify-center">

            <FaChartLine className="text-[#D4AF37] text-2xl" />

          </div>

          <h2 className="text-3xl font-bold mt-6 text-[#3B2418]">

            ₹{averageOrderValue.toLocaleString("en-IN")}

          </h2>

          <p className="text-gray-500 mt-2">
            Average Order Value
          </p>

        </div>

      </div>


      {/* ================= REVENUE CHART ================= */}

       <div className="grid grid-cols-1 xl:grid-cols-1 gap-8 mb-10"> 


<RevenueOverview />


     </div>
      {/* ================= ORDERS + CATEGORY ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">


        {/* Orders Chart */}

<OrdersOverview />

        {/* Category Chart */}




        
<SalesByCategory />

      </div>


      {/* ================= PRODUCT + ORDER STATUS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">


        {/* Top Products */}

 <TopSellingProducts />


        {/* Order Status */}

       <OrderStatus />

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