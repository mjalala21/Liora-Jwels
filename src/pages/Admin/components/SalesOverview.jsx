import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// import { getAllOrders } from "../../services/ordersApi";
import { getAllOrders } from "../../../services/ordersApi";

function SalesOverview() {

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

const salesData = useMemo(() => {
  const dailySales = {};

  orders.forEach((order) => {
    if (order.status === "Cancelled") return;

    const date = new Date(order.createdAt);

    // Only current month
    const now = new Date();

    if (
      date.getMonth() !== now.getMonth() ||
      date.getFullYear() !== now.getFullYear()
    ) {
      return;
    }

    const day = date.getDate();

    dailySales[day] =
      (dailySales[day] || 0) +
      Number(order.totalAmount);
  });

  return Object.entries(dailySales)
    .map(([day, sales]) => ({
      day: `Day ${day}`,
      sales,
    }))
    .sort((a, b) => {
      const dayA = Number(a.day.replace("Day ", ""));
      const dayB = Number(b.day.replace("Day ", ""));

      return dayA - dayB;
    });

}, [orders]);


  return (
    <div className="xl:col-span-2 bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-serif text-[#3B2418] mb-6">
        Sales Overview
      </h2>

      <div className="h-72">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={salesData}>

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
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              formatter={(value) => [
                `₹${value}`,
                "Sales",
              ]}
            />

            <Line
              type="monotone"
              dataKey="sales"
              stroke="#D4AF37"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default SalesOverview;