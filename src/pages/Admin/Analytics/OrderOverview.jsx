// import React, { useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// import { getOrders } from "../../../services/ordersApi";


// function OrdersOverview() {

//   const { data: orders = [] } = useQuery({
//     queryKey: ["orders"],
//     queryFn: getOrders,
//   });


// const ordersData = useMemo(() => {
//   const dailyOrders = {};

//   const now = new Date();

//   // Get Monday of the current week
//   const monday = new Date(now);
//   const day = monday.getDay();

//   const diff = day === 0 ? -6 : 1 - day;

//   monday.setDate(monday.getDate() + diff);
//   monday.setHours(0, 0, 0, 0);

//   // Create Monday → Sunday
//   const weekDays = [
//     "Mon",
//     "Tue",
//     "Wed",
//     "Thu",
//     "Fri",
//     "Sat",
//     "Sun",
//   ];

//   weekDays.forEach((day) => {
//     dailyOrders[day] = 0;
//   });

//   // Count orders
//   orders.forEach((order) => {
//     if (order.status === "Cancelled") return;

//     const date = new Date(order.createdAt);

//     // Get difference from Monday
//     const difference =
//       Math.floor(
//         (date - monday) / (1000 * 60 * 60 * 24)
//       );

//     // Only current week
//     if (difference < 0 || difference > 6) return;

//     const dayName = weekDays[difference];

//     dailyOrders[dayName]++;
//   });

//   return weekDays.map((day) => ({
//     day,
//     orders: dailyOrders[day],
//   }));

// }, [orders]);


//   return (
//     <div className="bg-white rounded-3xl shadow-lg p-8">

//       <div className="mb-6">

//         <h2 className="text-2xl font-serif text-[#3B2418]">
//           Orders Overview
//         </h2>

//         <p className="text-gray-500 text-sm mt-1">
//           Orders placed this month
//         </p>

//       </div>


//       <div className="h-80">

//         <ResponsiveContainer
//           width="100%"
//           height="100%"
//         >

//           <BarChart data={ordersData}>

//             <CartesianGrid
//               strokeDasharray="3 3"
//               vertical={false}
//             />

//             <XAxis
//               dataKey="day"
//               tickLine={false}
//               axisLine={false}
//             />

//             <YAxis
//               allowDecimals={false}
//               tickLine={false}
//               axisLine={false}
//             />

//             <Tooltip
//               formatter={(value) => [
//                 value,
//                 "Orders",
//               ]}
//             />

//             <Bar
//               dataKey="orders"
//               fill="#D4AF37"
//               radius={[6, 6, 0, 0]}
//             />

//           </BarChart>

//         </ResponsiveContainer>

//       </div>

//     </div>
//   );
// }

// export default OrdersOverview;
import React, { useMemo } from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function OrdersOverview({ orders = [], dateRange }) {

  const ordersData = useMemo(() => {

    // ==========================================
    // 7 DAYS
    // ==========================================

    if (dateRange === "7days") {

      const data = [];

      const today = new Date();

      for (let i = 6; i >= 0; i--) {

        const date = new Date(today);

        date.setDate(today.getDate() - i);

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const ordersCount = orders.filter((order) => {

          if (order.status === "Cancelled") {
            return false;
          }

          const orderDate = new Date(order.createdAt);

          return (
            orderDate.getDate() === day &&
            orderDate.getMonth() === month &&
            orderDate.getFullYear() === year
          );

        }).length;

        data.push({
          week: date.toLocaleDateString("en-IN", {
            weekday: "short",
          }),
          orders: ordersCount,
        });

      }

      return data;
    }


    // ==========================================
    // 30 DAYS
    // ==========================================

    if (dateRange === "30days") {

      const data = [
        {
          week: "Week 1",
          orders: 0,
        },
        {
          week: "Week 2",
          orders: 0,
        },
        {
          week: "Week 3",
          orders: 0,
        },
        {
          week: "Week 4",
          orders: 0,
        },
        {
          week: "Week 5",
          orders: 0,
        },
      ];

      orders.forEach((order) => {

        if (order.status === "Cancelled") {
          return;
        }

        const orderDate = new Date(order.createdAt);

        const today = new Date();

        const difference =
          Math.floor(
            (today - orderDate) /
              (1000 * 60 * 60 * 24)
          );

        const weekNumber =
          Math.floor(difference / 7);

        const index =
          4 - weekNumber;

        if (index >= 0 && index < 5) {
          data[index].orders++;
        }

      });

      return data;
    }


    // ==========================================
    // 6 MONTHS
    // ==========================================

    if (dateRange === "6months") {

      const data = [];

      const today = new Date();

      for (let i = 5; i >= 0; i--) {

        const date = new Date(
          today.getFullYear(),
          today.getMonth() - i,
          1
        );

        const month = date.getMonth();
        const year = date.getFullYear();

        const ordersCount = orders.filter((order) => {

          if (order.status === "Cancelled") {
            return false;
          }

          const orderDate = new Date(order.createdAt);

          return (
            orderDate.getMonth() === month &&
            orderDate.getFullYear() === year
          );

        }).length;

        data.push({
          week: date.toLocaleDateString("en-IN", {
            month: "short",
          }),
          orders: ordersCount,
        });

      }

      return data;
    }


    // ==========================================
    // THIS YEAR
    // ==========================================

    if (dateRange === "year") {

      const data = [];

      const currentYear = new Date().getFullYear();

      for (let month = 0; month <= new Date().getMonth(); month++) {

        const ordersCount = orders.filter((order) => {

          if (order.status === "Cancelled") {
            return false;
          }

          const orderDate = new Date(order.createdAt);

          return (
            orderDate.getMonth() === month &&
            orderDate.getFullYear() === currentYear
          );

        }).length;

        const date = new Date(
          currentYear,
          month,
          1
        );

        data.push({
          week: date.toLocaleDateString("en-IN", {
            month: "short",
          }),
          orders: ordersCount,
        });

      }

      return data;
    }


    return [];

  }, [orders, dateRange]);


  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-lg

        p-5
        sm:p-6
        lg:p-8
      "
    >

      {/* =================================
          HEADER
      ================================= */}

      <div className="mb-6">

        <h2
          className="
            text-xl
            sm:text-2xl

            font-serif
            text-[#3B2418]
          "
        >
          Orders Overview
        </h2>

        <p
          className="
            text-gray-500
            text-sm
            mt-1
          "
        >
          {dateRange === "7days"
            ? "Orders placed in the last 7 days"
            : dateRange === "30days"
            ? "Orders placed in the last 30 days"
            : dateRange === "6months"
            ? "Orders placed in the last 6 months"
            : "Orders placed this year"}
        </p>

      </div>


      {/* =================================
          CHART
      ================================= */}

      <div className="h-72 sm:h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart
            data={ordersData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => [
                value,
                "Orders",
              ]}
            />

            <Bar
              dataKey="orders"
              fill="#D4AF37"
              radius={[6, 6, 0, 0]}
              barSize={35}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default OrdersOverview;