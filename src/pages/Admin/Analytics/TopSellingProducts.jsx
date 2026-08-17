import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../../../services/productsApi";
import { getAllOrders } from "../../../services/ordersApi";

function TopSellingProducts() {

    const { data: orders = [] } = useQuery({
      queryKey: ["orders"],
      queryFn: getAllOrders,
    });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });


  const topProducts = useMemo(() => {

    const productSales = {};

    orders.forEach((order) => {

      // Don't count cancelled orders
      if (order.status === "Cancelled") return;

      order.items?.forEach((item) => {

        const productId = item.productId;

        if (!productId) return;

        productSales[productId] =
          (productSales[productId] || 0) +
          Number(item.quantity || 0);

      });

    });


    return Object.entries(productSales)
      .map(([productId, sales]) => {

        const product = products.find(
          (product) =>
            String(product.id) === String(productId)
        );

        return {
          productId,
          name: product?.name || "Unknown Product",
          sales,
        };

      })
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 5);

  }, [orders, products]);


  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">

      <h2 className="text-2xl font-serif text-[#3B2418]">
        Top Selling Products
      </h2>

      <p className="text-gray-500 mt-1">
        Best performing products
      </p>

      <div className="space-y-5 mt-6">

        {topProducts.length > 0 ? (

          topProducts.map((product, index) => (

            <div
              key={product.productId}
              className="flex justify-between items-center border-b pb-4"
            >

              <div>

                <h3 className="text-[#3B2418] font-semibold">
                  {product.name}
                </h3>

                <p className="text-gray-500 text-sm">
                  {product.sales} Sales
                </p>

              </div>

              <span className="text-[#D4AF37] font-bold text-lg">
                #{index + 1}
              </span>

            </div>

          ))

        ) : (

          <p className="text-gray-500 text-center py-10">
            No sales data available for this period.
          </p>

        )}

      </div>

    </div>
  );
}

export default TopSellingProducts;