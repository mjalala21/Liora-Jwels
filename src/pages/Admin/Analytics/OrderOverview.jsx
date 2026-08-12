import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { getOrders } from "../../../services/ordersApi";


function OrdersOverview() {

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });


const ordersData = useMemo(() => {
  const dailyOrders = {};

  const now = new Date();

  // Get Monday of the current week
  const monday = new Date(now);
  const day = monday.getDay();

  const diff = day === 0 ? -6 : 1 - day;

  monday.setDate(monday.getDate() + diff);
  monday.setHours(0, 0, 0, 0);

  // Create Monday → Sunday
  const weekDays = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  weekDays.forEach((day) => {
    dailyOrders[day] = 0;
  });

  // Count orders
  orders.forEach((order) => {
    if (order.status === "Cancelled") return;

    const date = new Date(order.createdAt);

    // Get difference from Monday
    const difference =
      Math.floor(
        (date - monday) / (1000 * 60 * 60 * 24)
      );

    // Only current week
    if (difference < 0 || difference > 6) return;

    const dayName = weekDays[difference];

    dailyOrders[dayName]++;
  });

  return weekDays.map((day) => ({
    day,
    orders: dailyOrders[day],
  }));

}, [orders]);


  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="mb-6">

        <h2 className="text-2xl font-serif text-[#3B2418]">
          Orders Overview
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Orders placed this month
        </p>

      </div>


      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={ordersData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="day"
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
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default OrdersOverview;