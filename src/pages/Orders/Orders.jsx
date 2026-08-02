import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { getOrders, getProducts } from "../../services/api";
function MyOrders() {


  const user = JSON.parse(localStorage.getItem("user"));

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrders(user.id),
    enabled: !!user,
  });
  const { data: products = [] } = useQuery({

  queryKey:["products"],

  queryFn:getProducts

});

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-brand-brown text-xl">
        Loading your orders...
      </div>
    );
  }

  const updatedOrders = orders.map(order => {

  return {

    ...order,

    items: order.items.map(item => {

      const product = products.find(
        p => String(p.id) === String(item.productId)
      );


      return {
        ...item,
        product
      };

    })

  };

});

  return (
    <div className="min-h-screen bg-[#F8F4EC] px-6 py-16">
    
      <div className="pt-20 text-center mb-14">
        <h1 className="text-5xl font-serif text-brand-brown tracking-wide">
          My Orders
        </h1>
        <p className="mt-4 text-gray-600">
          Your timeless jewellery journey
        </p>
      </div>

      
      {orders.length === 0 ? (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-16 text-center">
          <FaShoppingBag className="mx-auto text-5xl text-brand-gold" />
          <h2 className="text-3xl font-serif text-brand-brown mt-6">
            No Orders Yet
          </h2>
          <p className="text-gray-500 mt-3">
            Your jewellery orders will appear here once you place an order.
          </p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-8">
          {updatedOrders
            .slice()
            .reverse()
            .map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl shadow-xl p-8"
              >

                <div className="flex justify-between items-center flex-wrap gap-4 border-b pb-5">
                  <div>
                    <h2 className="text-xl font-serif text-brand-brown">
                      Order #{order.id}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-500 mt-2">
                      <FaCalendarAlt />
                      <span>
                        {new Date(order.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                  </div>

                  <span className="bg-[#D4AF37]/20 text-[#8B6B25] px-5 py-2 rounded-full font-medium">
                    {order.status}
                  </span>
                </div>

                
                <div className="mt-8 space-y-6">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-6 items-center border-b pb-5 last:border-none"
                    >
                      <img
                        src={item.product?.image}
                        alt={item.product?.name}
                        className="w-28 h-28 object-cover rounded-2xl"
                      />

                      <div className="flex-1">
                        <h3 className="text-2xl font-serif text-brand-brown">
                          {item.product?.name}
                        </h3>

                        <p className="text-gray-600 mt-2">
                          Quantity : {item.quantity}
                        </p>

                        <p className="text-lg mt-2 font-semibold text-brand-gold">
                          ₹{item.product?.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Address */}
                <div className="mt-8 bg-[#F8F4EC] rounded-2xl p-5">
                  <div className="flex gap-3 items-center text-brand-brown">
                    <FaMapMarkerAlt />
                    <h3 className="font-semibold">Delivery Address</h3>
                  </div>

                  <p className="mt-3 text-gray-600 leading-7">
                    {order.shippingAddress.fullName} <br />
                    {order.shippingAddress.phone} <br />
                    {order.shippingAddress.city} <br />
                    {order.shippingAddress.address}
                  </p>
                </div>

                {/* Bottom */}
                <div className="mt-8 flex justify-between items-center border-t pt-6 flex-wrap gap-4">
                  <div>
                    <p className="text-gray-500">Total Amount</p>
                    <h2 className="text-2xl font-semibold text-brand-brown">
                      ₹{order.totalAmount}
                    </h2>
                  </div>

                  <div className="text-sm text-gray-500 text-right">
                    <p>Payment Method</p>
                    <p className="font-medium text-brand-brown uppercase">
                      {order.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;