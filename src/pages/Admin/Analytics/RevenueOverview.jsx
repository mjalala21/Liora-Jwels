import React, { useMemo } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function RevenueOverview({
  orders = [],
  dateRange,
}) {

  const revenueData = useMemo(() => {

    // ==========================================
    // 7 DAYS
    // ==========================================

    if (dateRange === "7days") {

      const data = [];

      const today = new Date();

      for (let i = 6; i >= 0; i--) {

        const date = new Date(today);

        date.setDate(
          today.getDate() - i
        );

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const revenue = orders.reduce(
          (total, order) => {

            if (order.status === "Cancelled") {
              return total;
            }

            const orderDate =
              new Date(order.createdAt);

            if (
              orderDate.getDate() === day &&
              orderDate.getMonth() === month &&
              orderDate.getFullYear() === year
            ) {
              return (
                total +
                Number(order.totalAmount || 0)
              );
            }

            return total;
          },
          0
        );

        data.push({
          label: date.toLocaleDateString(
            "en-IN",
            {
              weekday: "short",
            }
          ),
          revenue,
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
          label: "Week 1",
          revenue: 0,
        },
        {
          label: "Week 2",
          revenue: 0,
        },
        {
          label: "Week 3",
          revenue: 0,
        },
        {
          label: "Week 4",
          revenue: 0,
        },
        {
          label: "Week 5",
          revenue: 0,
        },
      ];

      const today = new Date();

      orders.forEach((order) => {

        if (order.status === "Cancelled") {
          return;
        }

        const orderDate =
          new Date(order.createdAt);

        const difference =
          Math.floor(
            (today - orderDate) /
              (1000 * 60 * 60 * 24)
          );

        const weekNumber =
          Math.floor(difference / 7);

        const index =
          4 - weekNumber;

        if (
          index >= 0 &&
          index < 5
        ) {
          data[index].revenue +=
            Number(order.totalAmount || 0);
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

        const month =
          date.getMonth();

        const year =
          date.getFullYear();

        const revenue = orders.reduce(
          (total, order) => {

            if (order.status === "Cancelled") {
              return total;
            }

            const orderDate =
              new Date(order.createdAt);

            if (
              orderDate.getMonth() === month &&
              orderDate.getFullYear() === year
            ) {
              return (
                total +
                Number(order.totalAmount || 0)
              );
            }

            return total;
          },
          0
        );

        data.push({
          label: date.toLocaleDateString(
            "en-IN",
            {
              month: "short",
            }
          ),
          revenue,
        });

      }

      return data;
    }


    // ==========================================
    // THIS YEAR
    // ==========================================

    if (dateRange === "year") {

      const data = [];

      const today = new Date();

      const currentYear =
        today.getFullYear();

      const currentMonth =
        today.getMonth();

      for (
        let month = 0;
        month <= currentMonth;
        month++
      ) {

        const revenue = orders.reduce(
          (total, order) => {

            if (order.status === "Cancelled") {
              return total;
            }

            const orderDate =
              new Date(order.createdAt);

            if (
              orderDate.getMonth() === month &&
              orderDate.getFullYear() === currentYear
            ) {
              return (
                total +
                Number(order.totalAmount || 0)
              );
            }

            return total;
          },
          0
        );

        const date = new Date(
          currentYear,
          month,
          1
        );

        data.push({
          label: date.toLocaleDateString(
            "en-IN",
            {
              month: "short",
            }
          ),
          revenue,
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
          Revenue Overview
        </h2>

        <p
          className="
            text-gray-500
            text-sm
            mt-1
          "
        >
          {dateRange === "7days"
            ? "Revenue generated in the last 7 days"
            : dateRange === "30days"
            ? "Revenue generated in the last 30 days"
            : dateRange === "6months"
            ? "Revenue generated in the last 6 months"
            : "Revenue generated this year"}
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

          <LineChart
            data={revenueData}
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
              dataKey="label"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                `₹${value}`
              }
            />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value).toLocaleString(
                  "en-IN"
                )}`,
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