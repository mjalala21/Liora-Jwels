import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { getOrders } from "../../../services/ordersApi";


const COLORS = [
  "#D4AF37",
  "#8B5E3C",
  "#C9A66B",
  "#6B4423",
  "#E5C07B",
];


function OrderStatus() {

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });


  const statusData = useMemo(() => {

    const statusCount = {};

    orders.forEach((order) => {

      const status = order.status;

      statusCount[status] =
        (statusCount[status] || 0) + 1;

    });


    return Object.entries(statusCount).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  }, [orders]);


  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-serif text-[#3B2418]">
        Order Status
      </h2>

      <p className="text-gray-500 mt-1">
        Current order distribution
      </p>


      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              innerRadius={65}
              paddingAngle={3}
            >

              {statusData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>


            <Tooltip
              formatter={(value) => [
                value,
                "Orders",
              ]}
            />


            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default OrderStatus;