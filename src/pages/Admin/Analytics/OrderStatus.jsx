// import React, { useMemo } from "react";
// import { useQuery } from "@tanstack/react-query";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// import { getOrders } from "../../../services/ordersApi";


// const COLORS = [
//   "#D4AF37",
//   "#8B5E3C",
//   "#C9A66B",
//   "#6B4423",
//   "#E5C07B",
// ];


// function OrderStatus() {

//   const { data: orders = [] } = useQuery({
//     queryKey: ["orders"],
//     queryFn: getOrders,
//   });


//   const statusData = useMemo(() => {

//     const statusCount = {};

//     orders.forEach((order) => {

//       const status = order.status;

//       statusCount[status] =
//         (statusCount[status] || 0) + 1;

//     });


//     return Object.entries(statusCount).map(
//       ([name, value]) => ({
//         name,
//         value,
//       })
//     );

//   }, [orders]);


//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-8">

//       <h2 className="text-2xl font-serif text-[#3B2418]">
//         Order Status
//       </h2>

//       <p className="text-gray-500 mt-1">
//         Current order distribution
//       </p>


//       <div className="h-[320px]">

//         <ResponsiveContainer
//           width="100%"
//           height="100%"
//         >

//           <PieChart>

//             <Pie
//               data={statusData}
//               dataKey="value"
//               nameKey="name"
//               cx="50%"
//               cy="50%"
//               outerRadius={110}
//               innerRadius={65}
//               paddingAngle={3}
//             >

//               {statusData.map((_, index) => (
//                 <Cell
//                   key={index}
//                   fill={COLORS[index]}
//                 />
//               ))}

//             </Pie>


//             <Tooltip
//               formatter={(value,name) => [
//                 value,
//                 name,
//               ]}
//             />


//             <Legend />

//           </PieChart>

//         </ResponsiveContainer>

//       </div>

//     </div>
//   );
// }

// export default OrderStatus;


import React, { useMemo } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const COLORS = [
  "#D4AF37",
  "#8B5E3C",
  "#C9A66B",
  "#6B4423",
  "#E5C07B",
];


function OrderStatus({ orders = [], dateRange }) {

  const statusData = useMemo(() => {

    const statusCount = {};

    orders.forEach((order) => {

      const status = order.status;

      if (!status) return;

      statusCount[status] =
        (statusCount[status] || 0) + 1;

    });


    return Object.entries(statusCount).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  }, [orders]);


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
        Order Status
      </h2>


      <p
        className="
          text-gray-500
          text-sm
          mt-1
        "
      >
        {dateRange === "7days"
          ? "Order status for the last 7 days"
          : dateRange === "30days"
          ? "Order status for the last 30 days"
          : dateRange === "6months"
          ? "Order status for the last 6 months"
          : "Order status for this year"}
      </p>


      {/* =========================
          CHART
      ========================== */}

      <div className="h-[300px] sm:h-[320px]">

        {statusData.length === 0 ? (

          <div
            className="
              h-full
              flex
              items-center
              justify-center
              text-gray-400
            "
          >
            No orders available
          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"

                cx="50%"
                cy="45%"

                outerRadius="65%"
                innerRadius="40%"

                paddingAngle={3}

                labelLine={false}
              >

                {statusData.map((entry, index) => (

                  <Cell
                    key={`cell-${entry.name}`}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))}

              </Pie>


              <Tooltip
                formatter={(value, name) => [
                  value,
                  name,
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


export default OrderStatus;