import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaRupeeSign,
  FaShoppingBag,
  FaUsers,
  FaChartLine,
  FaBoxOpen,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// import { getOrders, getUsers } from "../../services/api";
import { getOrders } from "../../services/ordersApi";
import { getUsers } from "../../services/userApi";
import { getProducts } from "../../services/productsApi";

function AdminAnalytics() {
  /* =========================
     FETCH DATA
  ========================= */

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


  /* =========================
     BASIC CALCULATIONS
  ========================= */

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.totalAmount || 0),
    0
  );

  const totalOrders = orders.length;

  const totalCustomers = users.filter(
    (user) => user.role === "customer"
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


  /* =========================
     REVENUE DATA
  ========================= */

  const revenueData = [
    { month: "Jan", revenue: 45000 },
    { month: "Feb", revenue: 62000 },
    { month: "Mar", revenue: 58000 },
    { month: "Apr", revenue: 85000 },
    { month: "May", revenue: 76000 },
    { month: "Jun", revenue: 110000 },
  ];


  /* =========================
     ORDER DATA
  ========================= */

  const orderData = [
    { month: "Jan", orders: 35 },
    { month: "Feb", orders: 48 },
    { month: "Mar", orders: 42 },
    { month: "Apr", orders: 67 },
    { month: "May", orders: 58 },
    { month: "Jun", orders: 85 },
  ];


  /* =========================
     CATEGORY ANALYTICS
  ========================= */

  const categoryData = [];

  const categories = [
    "Ring",
    "Necklace",
    "Bracelet",
    "Earring",
    "Bangle",
  ];

  categories.forEach((category) => {
    const categoryProducts = products.filter(
      (product) => product.category === category
    );

    const revenue = categoryProducts.reduce(
      (total, product) =>
        total +
        Number(product.price || 0) *
          Number(product.sold || 0),
      0
    );

    categoryData.push({
      name: category,
      value: revenue,
    });
  });


  /* =========================
     ORDER STATUS
  ========================= */

  const statusData = [
    {
      name: "Delivered",
      value: orders.filter(
        (order) => order.status === "Delivered"
      ).length,
    },
    {
      name: "Pending",
      value: orders.filter(
        (order) => order.status === "Pending"
      ).length,
    },
    {
      name: "Processing",
      value: orders.filter(
        (order) => order.status === "Processing"
      ).length,
    },
    {
      name: "Cancelled",
      value: orders.filter(
        (order) => order.status === "Cancelled"
      ).length,
    },
  ];


  /* =========================
     TOP PRODUCTS
  ========================= */

  const topProducts = [...products]
    .sort(
      (a, b) =>
        Number(b.sold || 0) -
        Number(a.sold || 0)
    )
    .slice(0, 5);


  /* =========================
     CHART COLORS
  ========================= */

  const COLORS = [
    "#D4AF37",
    "#8B6F47",
    "#B89555",
    "#C9A66B",
    "#3B2418",
  ];


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

      <div className="bg-white rounded-3xl shadow-xl p-8 mb-10">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h2 className="text-2xl font-serif text-[#3B2418]">
              Revenue Overview
            </h2>

            <p className="text-gray-500 mt-1">
              Revenue performance over time
            </p>

          </div>

        </div>


        <div className="h-[350px]">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={revenueData}>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip
                formatter={(value) =>
                  `₹${value.toLocaleString("en-IN")}`
                }
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#D4AF37"
                strokeWidth={3}
                dot={{ r: 5 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* ================= ORDERS + CATEGORY ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">


        {/* Orders Chart */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-serif text-[#3B2418]">
            Orders Overview
          </h2>

          <p className="text-gray-500 mt-1 mb-8">
            Number of orders received
          </p>


          <div className="h-[320px]">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={orderData}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="orders"
                  fill="#D4AF37"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* Category Chart */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-serif text-[#3B2418]">
            Sales by Category
          </h2>

          <p className="text-gray-500 mt-1">
            Category performance
          </p>


          <div className="h-[320px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  innerRadius={65}
                  paddingAngle={3}
                >

                  {categoryData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />
                    )
                  )}

                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `₹${value.toLocaleString("en-IN")}`
                  }
                />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>


      {/* ================= PRODUCT + ORDER STATUS ================= */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">


        {/* Top Products */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="flex items-center gap-3 mb-7">

            <FaBoxOpen className="text-[#D4AF37] text-xl" />

            <h2 className="text-2xl font-serif text-[#3B2418]">
              Top Selling Products
            </h2>

          </div>


          <div className="space-y-5">

            {topProducts.map((product, index) => (

              <div
                key={product.id}
                className="flex items-center gap-4 border-b pb-4"
              >

                <span className="text-[#D4AF37] font-bold">
                  #{index + 1}
                </span>


                <img
                  src={product.image}
                  alt={product.name}
                  className="w-14 h-14 rounded-xl object-cover"
                />


                <div className="flex-1">

                  <h3 className="font-semibold text-[#3B2418]">
                    {product.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {product.sold || 0} Sales
                  </p>

                </div>


                <span className="font-bold text-[#D4AF37]">

                  ₹
                  {Number(product.price || 0).toLocaleString(
                    "en-IN"
                  )}

                </span>

              </div>

            ))}

          </div>

        </div>


        {/* Order Status */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-serif text-[#3B2418]">
            Order Status
          </h2>

          <p className="text-gray-500 mt-1 mb-5">
            Current order distribution
          </p>


          <div className="h-[300px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={60}
                >

                  {statusData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={COLORS[index]}
                      />
                    )
                  )}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

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