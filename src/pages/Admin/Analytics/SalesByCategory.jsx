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
import { getProducts } from "../../../services/productsApi";

const COLORS = [
  "#D4AF37",
  "#8B5E3C",
  "#C9A66B",
  "#6B4423",
  "#E5C07B",
];

function SalesByCategory() {

  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });


  const categoryData = useMemo(() => {

    const categorySales = {};

    orders.forEach((order) => {

      if (order.status === "Cancelled") return;

      order.items?.forEach((item) => {

        const product = products.find(
          (product) => product.id === item.productId
        );

        if (!product) return;

        const category = product.category;

        const quantity = Number(item.quantity);

        const price = Number(product.price);

        const revenue = price * quantity;

        categorySales[category] =
          (categorySales[category] || 0) + revenue;

      });

    });


    return Object.entries(categorySales).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  }, [orders, products]);


  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-serif text-[#3B2418]">
        Sales by Category
      </h2>

      <p className="text-gray-500 mt-1">
        Category performance
      </p>


      <div className="h-[320px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

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

              {categoryData.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}

            </Pie>


            <Tooltip
              formatter={(value) =>
                `₹${Number(value).toLocaleString("en-IN")}`
              }
            />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default SalesByCategory;