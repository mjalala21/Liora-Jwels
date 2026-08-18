import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePagination from "../../../hooks/usePagination";
import Pagination from "./Pagination";
import { getAllOrders, updateOrderStatus } from "../../../services/ordersApi";
import {
  FaSearch,
  FaShoppingBag,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
} from "react-icons/fa";
import OrderView from "./OrderView";

function OrdersTable({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const queryClient = useQueryClient();

  const orderStatusMutation = useMutation({
    mutationFn: ({ orderId, status }) => updateOrderStatus(orderId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });

  function handleStatusChange(orderId, status) {
    orderStatusMutation.mutate({
      orderId,
      status,
    });
  }

  const { page, setPage, totalPages, currentItems, nextPage, previousPage } =
    usePagination(orders, 5);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8F4EC] border-b">
            <tr className="text-left text-[#3B2418]">
              <th className="px-6 py-5">Order ID</th>

              <th>Customer</th>

              <th>Date</th>

              <th>Items</th>

              <th>Amount</th>

              <th>Payment</th>

              <th>Status</th>

              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-[#FDFBF8] transition-all"
              >
                {/* Order ID */}

                <td className="px-6 py-5">
                  <span className="font-semibold text-[#3B2418]">
                    #{order.id.slice(0, 8)}
                  </span>
                </td>

                {/* Customer */}

                <td>
                  <div>
                    <p className="font-semibold text-[#3B2418]">
                      {order.shippingAddress?.fullName}
                    </p>

                    <p className="text-sm text-gray-400">
                      {order.shippingAddress?.city}
                    </p>
                  </div>
                </td>

                {/* Date */}

                <td className="text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString("en-IN")}
                </td>

                {/* Items */}

                <td>
                  <span className="bg-[#F8F4EC] px-3 py-1 rounded-full text-sm">
                    {order.items?.length} Items
                  </span>
                </td>

                {/* Amount */}

                <td className="font-bold text-[#D4AF37]">
                  ₹{Number(order.totalAmount).toLocaleString("en-IN")}
                </td>

                {/* Payment */}

                <td>
                  <span className="capitalize text-gray-600">
                    {order.paymentMethod}
                  </span>
                </td>

                {/* Status */}

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className={`border rounded-2xl px-3 py-2 font-medium
                        ${
                          order.status === "Pending"
                            ? "bg-yellow-50 text-yellow-700"
                            : order.status === "Processing"
                              ? " bg-blue-50 text-blue-700"
                              : order.status === "Shipped"
                                ? "bg-purple-50 text-purple-700"
                                : order.status === "Delivered"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-red-50 text-red-700"
                        }
                      `}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                {/* Action */}

                <td>
                  <div className="flex justify-center">
                    <button
                      className="w-10 h-10 rounded-xl bg-[#F8F4EC] hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <FaEye />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Order */}

      {selectedOrder && (
        <OrderView
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Pagination */}

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    </div>
  );
}

export default OrdersTable;
