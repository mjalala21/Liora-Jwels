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

import { getAllOrders } from "../../../services/ordersApi";


function RevenueOverview() {

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });


  const revenueData = useMemo(() => {

    const dailyRevenue = {};

    const now = new Date();

    orders.forEach((order) => {

      // Ignore cancelled orders
      if (order.status === "Cancelled") return;

      const date = new Date(order.createdAt);

      // Current month only
      if (
        date.getMonth() !== now.getMonth() ||
        date.getFullYear() !== now.getFullYear()
      ) {
        return;
      }

      const day = date.getDate();

      dailyRevenue[day] =
        (dailyRevenue[day] || 0) +
        Number(order.totalAmount);

    });


    return Object.entries(dailyRevenue)
      .map(([day, revenue]) => ({
        day: `Day ${day}`,
        revenue,
      }))
      .sort((a, b) => {

        const dayA = Number(
          a.day.replace("Day ", "")
        );

        const dayB = Number(
          b.day.replace("Day ", "")
        );

        return dayA - dayB;

      });

  }, [orders]);


  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-2xl font-serif text-[#3B2418]">
            Revenue Overview
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Revenue generated this month
          </p>
        </div>

      </div>


      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <LineChart data={revenueData}>

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
                "Revenue",
              ]}
            />

            <Line
              type="monotone"
              dataKey="revenue"
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

export default RevenueOverview;