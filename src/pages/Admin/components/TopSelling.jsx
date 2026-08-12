import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllOrders } from "../../../services/ordersApi";
import { getProducts } from "../../../services/productsApi";

function TopSelling() {

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

      if (order.status === "Cancelled") return;

      order.items?.forEach((item) => {

        const productId = item.productId;

        productSales[productId] =
          (productSales[productId] || 0) +
          Number(item.quantity);

      });

    });


    return Object.entries(productSales)
      .map(([productId, sales]) => {

        const product = products.find(
          (product) => product.id === productId
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
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <h2 className="text-2xl font-serif text-[#3B2418] mb-6">
        Top Selling
      </h2>

      <div className="space-y-5">

        {topProducts.map((product, index) => (

          <div
            key={product.productId}
            className="flex justify-between items-center border-b pb-3"
          >

            <div>

              <h3 className="text-[#3B2418] font-semibold">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {product.sales} Sales
              </p>

            </div>

            <span className="text-[#D4AF37] font-bold">
              #{index + 1}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}

export default TopSelling;