import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders, getProducts } from "../../services/api";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { id } = useParams();

  const user = useSelector((state) => state.user.user);

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user.id],

    queryFn: () => getOrders(user.id),
  });

  const { data: products = [] } = useQuery({
    queryKey: ["products"],

    queryFn: getProducts,
  });

  const order = orders.find((order) => String(order.id) === String(id));

  if (!order) {
    return (
      <div
        className="
min-h-screen
flex
items-center
justify-center
"
      >
        Order not found
      </div>
    );
  }

  const items = order.items.map((item) => ({
    ...item,

    product: products.find((p) => String(p.id) === String(item.productId)),
  }));

  return (
    <div
      className="
min-h-screen
bg-[#F8F4EC]
px-32
py-20
"
    >
      <div
        className="
max-w-5xl
mx-auto
bg-white
rounded-3xl
shadow-xl
p-10
"
      >
        <h1
          className="
text-4xl
font-serif
text-brand-brown
"
        >
          Order #{order.id}
        </h1>

        <p
          className="
mt-3
text-gray-500
"
        >
          Status :
          <span
            className="
text-brand-gold
ml-2
font-semibold
"
          >
            {order.status}
          </span>
        </p>

        <div
          className="
mt-10
space-y-6
"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="
flex
gap-6
items-center
border-b
pb-5
"
            >
              <Link to={`/products/${item.product.id}`}>
                <img
                  src={item.product?.image}
                  className="
w-32
h-32
rounded-2xl
object-cover
"
                />
              </Link>

              <div>
                <h2
                  className="
text-2xl
font-serif
text-brand-brown
"
                >
                  {item.product?.name}
                </h2>

                <p>Quantity : {item.quantity}</p>

                <p
                  className="
text-brand-gold
font-semibold
mt-2
"
                >
                  ₹{item.product?.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div
          className="
mt-8
bg-[#F8F4EC]
rounded-2xl
p-6
"
        >
          <h2
            className="
text-xl
font-serif
text-brand-brown
"
          >
            Delivery Address
          </h2>

          <p className="mt-3 text-gray-600">
            {order.shippingAddress.fullName}

            <br />

            {order.shippingAddress.phone}

            <br />

            {order.shippingAddress.city}

            <br />

            {order.shippingAddress.address}
          </p>
        </div>

        <div
          className="
mt-8
flex
justify-between
text-xl
font-semibold
"
        >
          <span>Total</span>

          <span className="text-brand-gold">₹{order.totalAmount}</span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
