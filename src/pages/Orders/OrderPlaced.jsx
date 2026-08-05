// import React from "react";
// import { Link } from "react-router-dom";
// import { FaCheckCircle } from "react-icons/fa";
// import { motion } from "framer-motion";

// function OrderSuccess() {
//   return (
//     <div className="min-h-screen bg-[#F8F4EC] flex items-center justify-center px-6">

//       <motion.div
//         initial={{ opacity: 0, scale: .8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: .6 }}
//         className="bg-white rounded-[40px] shadow-2xl p-16 max-w-xl w-full text-center"
//       >

//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{
//             delay: .3,
//             type: "spring",
//             stiffness: 150
//           }}
//         >
//           <FaCheckCircle className="text-7xl text-green-500 mx-auto" />
//         </motion.div>

//         <h1 className="mt-8 text-5xl font-serif text-brand-brown">
//           Order Placed!
//         </h1>

//         <p className="mt-5 text-gray-600 leading-8">
//           Thank you for choosing <span className="font-semibold">LIORA</span>.

//           <br />

//           Your jewellery is being prepared with care and elegance.

//           <br />

//           We'll notify you once it has been shipped.
//         </p>

//         <div className="mt-12 flex flex-col gap-4">

//           <Link
//             to="/orders"
//             className="
//               bg-brand-brown
//               text-white
//               py-4
//               rounded-full
//               tracking-widest
//               hover:bg-brand-gold
//               hover:text-brand-brown
//               transition
//             "
//           >
//             VIEW MY ORDERS
//           </Link>

//           <Link
//             to="/products"
//             className="
//               border-2
//               border-brand-brown
//               text-brand-brown
//               py-4
//               rounded-full
//               tracking-widest
//               hover:bg-brand-brown
//               hover:text-white
//               transition
//             "
//           >
//             CONTINUE SHOPPING
//           </Link>

//         </div>

//       </motion.div>

//     </div>
//   );
// }

// export default OrderSuccess;

import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderPlaced() {
  const { id } = useParams();

  return (
    <div
      className="
min-h-screen
bg-[#F8F4EC]
flex
items-center
justify-center
px-6
"
    >
      <div
        className="
bg-white
rounded-3xl
shadow-2xl
p-12
text-center
max-w-xl
"
      >
        <FaCheckCircle
          className="
mx-auto
text-7xl
text-brand-gold
"
        />

        <h1
          className="
text-5xl
font-serif
text-brand-brown
mt-8
"
        >
          Order Placed Successfully
        </h1>

        <p
          className="
text-gray-600
mt-5
text-lg
"
        >
          Thank you for choosing LIORA. Your jewellery journey begins here.
        </p>

        <div
          className="
mt-8
bg-[#F8F4EC]
rounded-xl
p-5
"
        >
          <p className="text-gray-500">Order ID</p>

          <h2
            className="
text-2xl
font-semibold
text-brand-brown
"
          >
            #{id}
          </h2>
        </div>

        <Link
          to={`/orders/${id}`}
          className="
block
mt-8
bg-brand-brown
text-white
py-4
rounded-full
tracking-widest
hover:bg-brand-gold
transition
"
        >
          View Order Details
        </Link>

        <Link
          to="/products"
          className="
block
mt-4
text-brand-gold
hover:underline
"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderPlaced;
