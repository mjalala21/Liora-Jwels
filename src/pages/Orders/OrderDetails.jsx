// import React from "react";
// import { useParams, Link } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// // import { getOrders, getProducts } from "../../services/api";
// import { getOrders } from "../../services/ordersApi";
// import { getProducts } from "../../services/productsApi";
// import { useSelector } from "react-redux";

// function OrderDetails() {
//   const { id } = useParams();

//   const user = useSelector((state) => state.user.user);

//   const { data: orders = [] } = useQuery({
//     queryKey: ["orders", user.id],

//     queryFn: () => getOrders(user.id),
//   });

//   const { data: products = [] } = useQuery({
//     queryKey: ["products"],

//     queryFn: getProducts,
//   });

//   const order = orders.find((order) => String(order.id) === String(id));

//   if (!order) {
//     return (
//       <div
//         className="
// min-h-screen
// flex
// items-center
// justify-center
// "
//       >
//         Order not found
//       </div>
//     );
//   }

//   const items = order.items.map((item) => ({
//     ...item,

//     product: products.find((p) => String(p.id) === String(item.productId)),
//   }));

//   return (
//     <div
//       className="
// min-h-screen
// bg-[#F8F4EC]
// px-32
// py-20
// "
//     >
//       <div
//         className="
// max-w-5xl
// mx-auto
// bg-white
// rounded-3xl
// shadow-xl
// p-10
// "
//       >
//         <h1
//           className="
// text-4xl
// font-serif
// text-brand-brown
// "
//         >
//           Order #{order.id}
//         </h1>

//         <p
//           className="
// mt-3
// text-gray-500
// "
//         >
//           Status :
//           <span
//             className="
// text-brand-gold
// ml-2
// font-semibold
// "
//           >
//             {order.status}
//           </span>
//         </p>

//         <div
//           className="
// mt-10
// space-y-6
// "
//         >
//           {items.map((item, index) => (
//             <div
//               key={index}
//               className="
// flex
// gap-6
// items-center
// border-b
// pb-5
// "
//             >
//               <Link to={`/products/${item.product.id}`}>
//                 <img
//                   src={item.product?.image}
//                   className="
// w-32
// h-32
// rounded-2xl
// object-cover
// "
//                 />
//               </Link>

//               <div>
//                 <h2
//                   className="
// text-2xl
// font-serif
// text-brand-brown
// "
//                 >
//                   {item.product?.name}
//                 </h2>

//                 <p>Quantity : {item.quantity}</p>

//                 <p
//                   className="
// text-brand-gold
// font-semibold
// mt-2
// "
//                 >
//                   ₹{item.product?.price}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div
//           className="
// mt-8
// bg-[#F8F4EC]
// rounded-2xl
// p-6
// "
//         >
//           <h2
//             className="
// text-xl
// font-serif
// text-brand-brown
// "
//           >
//             Delivery Address
//           </h2>

//           <p className="mt-3 text-gray-600">
//             {order.shippingAddress.fullName}

//             <br />

//             {order.shippingAddress.phone}

//             <br />

//             {order.shippingAddress.city}

//             <br />

//             {order.shippingAddress.address}
//           </p>
//         </div>

//         <div
//           className="
// mt-8
// flex
// justify-between
// text-xl
// font-semibold
// "
//         >
//           <span>Total</span>

//           <span className="text-brand-gold">₹{order.totalAmount}</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OrderDetails;



import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../services/ordersApi";
import { getProducts } from "../../services/productsApi";
import { useSelector } from "react-redux";

function OrderDetails() {
  const { id } = useParams();

  const user = useSelector((state) => state.user.user);

  // =========================
  // GET ORDERS
  // =========================

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrders(user.id),
    enabled: !!user,
  });

  // =========================
  // GET PRODUCTS
  // =========================

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  // =========================
  // FIND ORDER
  // =========================

  const order = orders.find(
    (order) => String(order.id) === String(id)
  );

  // =========================
  // ORDER NOT FOUND
  // =========================

  if (!order) {
    return (
      <div
        className="
          min-h-screen
          bg-[#F8F4EC]
          flex
          flex-col
          items-center
          justify-center
          px-4
          text-center
        "
      >
        <h1
          className="
            text-3xl
            sm:text-4xl
            font-serif
            text-brand-brown
          "
        >
          Order not found
        </h1>

        <Link
          to="/orders"
          className="
            mt-5
            text-brand-gold
            font-semibold
            hover:underline
          "
        >
          Back to Orders
        </Link>
      </div>
    );
  }

  // =========================
  // ORDER ITEMS
  // =========================

  const items = order.items.map((item) => ({
    ...item,
    product: products.find(
      (p) => String(p.id) === String(item.productId)
    ),
  }));

  return (
    <div
      className="
        min-h-screen
        bg-[#F8F4EC]

        px-4
        sm:px-6
        lg:px-12
        xl:px-20

        py-24
        sm:py-28
      "
    >
      {/* =========================
          MAIN CARD
      ========================== */}

      <div
        className="
          max-w-5xl
          mx-auto

          bg-white

          rounded-2xl
          sm:rounded-3xl

          shadow-xl

          p-5
          sm:p-8
          lg:p-10
        "
      >

        {/* =========================
            BACK BUTTON
        ========================== */}

        <Link
          to="/orders"
          className="
            inline-flex
            items-center
            gap-2

            text-sm
            sm:text-base

            text-gray-500
            hover:text-brand-gold

            transition
            duration-300
          "
        >
          ← Back to Orders
        </Link>

        {/* =========================
            HEADER
        ========================== */}

        <div
          className="
            mt-6
            sm:mt-8

            flex
            flex-col
            sm:flex-row

            sm:items-center
            sm:justify-between

            gap-3
          "
        >
          <h1
            className="
              text-3xl
              sm:text-4xl

              font-serif
              text-brand-brown
            "
          >
            Order #{order.id}
          </h1>

          {/* STATUS */}

          <div
            className="
              inline-flex
              items-center
              gap-2

              self-start
              sm:self-auto

              bg-[#F8F4EC]

              px-4
              py-2

              rounded-full
            "
          >
            <span
              className="
                text-sm
                text-gray-500
              "
            >
              Status:
            </span>

            <span
              className="
                text-sm
                font-semibold
                text-brand-gold
              "
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* =========================
            ORDER ITEMS
        ========================== */}

        <div
          className="
            mt-8
            sm:mt-10

            space-y-5
            sm:space-y-6
          "
        >
          {items.map((item, index) => {
            if (!item.product) {
              return null;
            }

            return (
              <div
                key={index}
                className="
                  flex
                  flex-row

                  gap-4
                  sm:gap-6

                  items-center

                  border-b
                  border-gray-200

                  pb-5
                  sm:pb-6
                "
              >
                {/* =========================
                    PRODUCT IMAGE
                ========================== */}

                <Link
                  to={`/products/${item.product.id}`}
                  className="
                    flex-shrink-0
                  "
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="
                      w-20
                      h-20

                      sm:w-28
                      sm:h-28

                      lg:w-32
                      lg:h-32

                      rounded-xl
                      sm:rounded-2xl

                      object-cover

                      hover:scale-105

                      transition
                      duration-300
                    "
                  />
                </Link>

                {/* =========================
                    PRODUCT DETAILS
                ========================== */}

                <div
                  className="
                    min-w-0
                    flex-1
                  "
                >
                  <Link
                    to={`/products/${item.product.id}`}
                  >
                    <h2
                      className="
                        text-lg
                        sm:text-xl
                        lg:text-2xl

                        font-serif
                        text-brand-brown

                        truncate

                        hover:text-brand-gold

                        transition
                      "
                    >
                      {item.product.name}
                    </h2>
                  </Link>

                  <p
                    className="
                      mt-1
                      sm:mt-2

                      text-sm
                      sm:text-base

                      text-gray-600
                    "
                  >
                    Quantity: {item.quantity}
                  </p>

                  <p
                    className="
                      text-brand-gold
                      font-semibold

                      mt-1
                      sm:mt-2

                      text-sm
                      sm:text-base
                    "
                  >
                    ₹{item.product.price}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================
            DELIVERY ADDRESS
        ========================== */}

        <div
          className="
            mt-8

            bg-[#F8F4EC]

            rounded-xl
            sm:rounded-2xl

            p-5
            sm:p-6
          "
        >
          <h2
            className="
              text-lg
              sm:text-xl

              font-serif
              text-brand-brown
            "
          >
            Delivery Address
          </h2>

          <div
            className="
              mt-3

              text-sm
              sm:text-base

              text-gray-600

              leading-7
            "
          >
            <p>
              {order.shippingAddress?.fullName}
            </p>

            <p>
              {order.shippingAddress?.phone}
            </p>

            <p>
              {order.shippingAddress?.city}
            </p>

            <p>
              {order.shippingAddress?.address}
            </p>
          </div>
        </div>

        {/* =========================
            PAYMENT METHOD
        ========================== */}

        {order.paymentMethod && (
          <div
            className="
              mt-5

              flex
              flex-col
              sm:flex-row

              sm:justify-between

              gap-1

              text-sm
              sm:text-base

              text-gray-600
            "
          >
            <span>
              Payment Method
            </span>

            <span
              className="
                font-semibold
                text-brand-brown
              "
            >
              {order.paymentMethod}
            </span>
          </div>
        )}

        {/* =========================
            TOTAL
        ========================== */}

        <div
          className="
            mt-8

            pt-6

            border-t
            border-gray-200

            flex
            items-center
            justify-between

            text-lg
            sm:text-xl

            font-semibold
          "
        >
          <span
            className="
              text-brand-brown
            "
          >
            Total
          </span>

          <span
            className="
              text-brand-gold
            "
          >
            ₹{order.totalAmount}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
