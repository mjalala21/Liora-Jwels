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

import { getProducts } from "../../../services/productsApi";


const COLORS = [
  "#D4AF37",
  "#8B5E3C",
  "#C9A66B",
  "#6B4423",
  "#E5C07B",
];


function SalesByCategory({
  orders = [],
  dateRange,
}) {

  const {
    data: products = [],
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });


  const categoryData = useMemo(() => {

    const categorySales = {};


    orders.forEach((order) => {

      // Ignore cancelled orders
      if (order.status === "Cancelled") {
        return;
      }


      order.items?.forEach((item) => {

        const product = products.find(
          (product) =>
            String(product.id) ===
            String(item.productId)
        );


        if (!product) {
          return;
        }


        const category = product.category;

        const quantity =
          Number(item.quantity) || 0;

        const price =
          Number(product.price) || 0;


        const revenue =
          price * quantity;


        categorySales[category] =
          (categorySales[category] || 0) +
          revenue;

      });

    });


    return Object.entries(categorySales)
      .map(([name, value]) => ({
        name,
        value,
      }))
      .sort((a, b) => b.value - a.value);

  }, [orders, products]);


  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-xl

        p-5
        sm:p-6
        lg:p-8
      "
    >

      {/* =========================
          HEADER
      ========================== */}

      <h2
        className="
          text-xl
          sm:text-2xl
          font-serif
          text-[#3B2418]
        "
      >
        Sales by Category
      </h2>


      <p
        className="
          text-gray-500
          text-sm
          mt-1
        "
      >
        {dateRange === "7days"
          ? "Category sales for the last 7 days"
          : dateRange === "30days"
          ? "Category sales for the last 30 days"
          : dateRange === "6months"
          ? "Category sales for the last 6 months"
          : "Category sales for this year"}
      </p>


      {/* =========================
          CHART
      ========================== */}

      <div className="h-[300px] sm:h-[320px]">

        {categoryData.length === 0 ? (

          <div
            className="
              h-full
              flex
              items-center
              justify-center
              text-gray-400
            "
          >
            No sales available
          </div>

        ) : (

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

                outerRadius="65%"
                innerRadius="40%"

                paddingAngle={3}
              >

                {categoryData.map(
                  (entry, index) => (

                    <Cell
                      key={`cell-${entry.name}`}
                      fill={
                        COLORS[index]
                      }
                    />

                  )
                )}

              </Pie>


              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString(
                    "en-IN"
                  )}`,
                  "Sales",
                ]}
              />


              <Legend
                verticalAlign="bottom"
                height={36}
              />

            </PieChart>

          </ResponsiveContainer>

        )}

      </div>

    </div>
  );
}


export default SalesByCategory;