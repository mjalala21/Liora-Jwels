
import React from "react";
import { FaTimes, FaBoxOpen, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

function OrderView({ order, onClose }) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50">

      {/* Background */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-xl bg-[#F8F4EC] shadow-2xl overflow-y-auto">

        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-white">

          <div>
            <p className="text-sm text-gray-500">
              Order Details
            </p>

            <h2 className="text-2xl font-serif text-[#3B2418]">
              Order #{order.id}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#F8F4EC]
            flex items-center justify-center
            hover:bg-[#D4AF37] hover:text-white transition"
          >
            <FaTimes />
          </button>

        </div>

        {/* Order Summary */}
        <div className="p-6">

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <div className="flex items-center gap-3 mb-6">

              <div className="w-12 h-12 rounded-full bg-[#F8F4EC]
                flex items-center justify-center">
                <FaBoxOpen className="text-xl text-[#D4AF37]" />
              </div>

              <div>
                <h3 className="text-xl font-serif text-[#3B2418]">
                  Order Summary
                </h3>

                <p className="text-sm text-gray-500">
                  Placed on{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-IN")
                    : "N/A"}
                </p>
              </div>

            </div>

            {/* Order Information */}
            <div className="space-y-4">

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">
                  Order ID
                </span>

                <span className="font-medium text-[#3B2418]">
                  #{order.id}
                </span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">
                  Customer ID
                </span>

                <span className="font-medium text-[#3B2418]">
                  {order.userId || "N/A"}
                </span>
              </div>

              <div className="flex justify-between border-b pb-4">
                <span className="text-gray-500">
                  Payment
                </span>

                <span className="font-medium text-[#3B2418] capitalize">
                  {order.paymentMethod || "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center border-b pb-4">
                <span className="text-gray-500">
                  Status
                </span>

                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-100 text-blue-700"
                      : order.status === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.status === "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-500">
                  Total Amount
                </span>

                <span className="text-2xl font-bold text-[#D4AF37]">
                  ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* Products */}
        <div className="px-6 pb-6">

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <h3 className="text-xl font-serif text-[#3B2418] mb-5">
              Ordered Products
            </h3>

            <div className="space-y-4">

              {order.items?.length > 0 ? (
                order.items.map((item, index) => (

                  <div
                    key={item.id || index}
                    className="flex items-center gap-4
                    border-b pb-4 last:border-b-0 last:pb-0"
                  >

                    {/* Product Image */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F8F4EC] flex-shrink-0">

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaBoxOpen className="text-2xl text-[#D4AF37]" />
                        </div>
                      )}

                    </div>

                    {/* Product Info */}
                    <div className="flex-1">

                      <h4 className="font-medium text-[#3B2418]">
                        {item.name || "Product"}
                      </h4>

                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity || 1}
                      </p>

                      <p className="text-sm text-gray-500">
                        Price: ₹
                        {Number(item.price || 0).toLocaleString("en-IN")}
                      </p>

                    </div>

                    {/* Item Total */}
                    <div className="text-right">

                      <p className="font-semibold text-[#3B2418]">
                        ₹
                        {Number(
                          (item.price || 0) * (item.quantity || 1)
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                ))
              ) : (
                <p className="text-gray-500 text-center py-6">
                  No products found in this order.
                </p>
              )}

            </div>

          </div>

        </div>

        {/* Shipping Address */}
        <div className="px-6 pb-6">

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 rounded-full bg-[#F8F4EC]
                flex items-center justify-center">
                <FaMapMarkerAlt className="text-[#D4AF37]" />
              </div>

              <h3 className="text-xl font-serif text-[#3B2418]">
                Shipping Address
              </h3>

            </div>

            {order.shippingAddress ? (
              <div className="text-gray-600 leading-7">

                {typeof order.shippingAddress === "object" ? (
                  <>
                    <p>
                      {order.shippingAddress.name}
                    </p>

                    <p>
                      {order.shippingAddress.address}
                    </p>

                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}
                    </p>

                    <p>
                      PIN: {order.shippingAddress.pincode}
                    </p>

                    {order.shippingAddress.phone && (
                      <p>
                        Phone: {order.shippingAddress.phone}
                      </p>
                    )}
                  </>
                ) : (
                  <p>{order.shippingAddress}</p>
                )}

              </div>
            ) : (
              <p className="text-gray-500">
                No shipping address available.
              </p>
            )}

          </div>

        </div>

        {/* Payment Information */}
        <div className="px-6 pb-8">

          <div className="bg-white rounded-3xl p-6 shadow-lg">

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 rounded-full bg-[#F8F4EC]
                flex items-center justify-center">
                <FaCreditCard className="text-[#D4AF37]" />
              </div>

              <h3 className="text-xl font-serif text-[#3B2418]">
                Payment Information
              </h3>

            </div>

            <div className="flex justify-between border-b pb-4">
              <span className="text-gray-500">
                Payment Method
              </span>

              <span className="font-medium text-[#3B2418] capitalize">
                {order.paymentMethod || "N/A"}
              </span>
            </div>

            <div className="flex justify-between pt-4">
              <span className="text-gray-500">
                Amount Paid
              </span>

              <span className="font-bold text-[#D4AF37]">
                ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrderView;

