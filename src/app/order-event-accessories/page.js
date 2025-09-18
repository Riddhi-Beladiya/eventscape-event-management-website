
// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// const API_URL = "https://order-item-31a05-default-rtdb.firebaseio.com/order-item.json";

// const Page = () => {
//   const [orders, setOrders] = useState([]);

//   // Fetch orders from Firebase
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const data = await response.json();
//         if (data) setOrders(Object.values(data)); // Convert object to array
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-5 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-center">Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="border border-gray-300 px-4 py-2">Order #</th>
//                 <th className="border border-gray-300 px-4 py-2">Image</th>
//                 <th className="border border-gray-300 px-4 py-2">Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Email</th>
//                 <th className="border border-gray-300 px-4 py-2">Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Item</th>
//                 <th className="border border-gray-300 px-4 py-2">Phone-no</th>
//                 <th className="border border-gray-300 px-4 py-2">Address</th>
//                 <th className="border border-gray-300 px-4 py-2">Quantity</th>
//                 <th className="border border-gray-300 px-4 py-2">Price (₹)</th>
//                 <th className="border border-gray-300 px-4 py-2">Total (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) =>
//                 order.items.map((item, idx) => (
//                   <tr
//                     key={`${index}-${idx}`}
//                     className={`border border-gray-300 ${
//                       idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     }`}
//                   >
//                     {idx === 0 && (
//                       <>
//                         <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={order.items.length}>
//                           {index + 1}
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
//                           {order.email || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
//                           {new Date(order.timestamp).toLocaleDateString()}
//                         </td>
//                       </>
//                     )}
//                     <td className="border border-gray-300 px-4 py-2">{item.name}</td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <Image
//                         className="rounded-lg"
//                         src={item.image}
//                         alt={item.name}
//                         width={50}
//                         height={50}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">{item.price}</td>
//                     <td className="border border-gray-300 px-4 py-2 font-semibold text-center">
//                       {(item.price * item.quantity).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;


// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// const API_URL = "https://order-item-31a05-default-rtdb.firebaseio.com/order-item.json";

// const Page = () => {
//   const [orders, setOrders] = useState([]);

//   // Fetch orders from Firebase
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(API_URL);
//         if (!response.ok) throw new Error("Failed to fetch data");

//         const data = await response.json();
//         if (data) setOrders(Object.values(data)); // Convert object to array
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <div className="p-5 max-w-6xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4 text-center">Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-gray-500 text-center">No orders found.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200 text-gray-700">
//                 <th className="border border-gray-300 px-4 py-2">Order #</th>
//                 <th className="border border-gray-300 px-4 py-2">Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Email</th>
//                 <th className="border border-gray-300 px-4 py-2">Phone-no</th>
//                 <th className="border border-gray-300 px-4 py-2">Address</th>
//                 <th className="border border-gray-300 px-4 py-2">Date</th>
//                 <th className="border border-gray-300 px-4 py-2">Item</th>
//                 <th className="border border-gray-300 px-4 py-2">Image</th>
//                 <th className="border border-gray-300 px-4 py-2">Quantity</th>
//                 <th className="border border-gray-300 px-4 py-2">Price (₹)</th>
//                 <th className="border border-gray-300 px-4 py-2">Total (₹)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) =>
//                 order.items.map((item, idx) => (
//                   <tr
//                     key={`${index}-${idx}`}
//                     className={`border border-gray-300 ${
//                       idx % 2 === 0 ? "bg-gray-50" : "bg-white"
//                     }`}
//                   >
//                     {idx === 0 && (
//                       <>
//                         <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={order.items.length}>
//                           {index + 1}
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
//                           {order.name || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
//                           {order.email || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
//                           {order.phone || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
//                           {order.address || "N/A"}
//                         </td>
//                         <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
//                           {new Date(order.timestamp).toLocaleDateString()}
//                         </td>
//                       </>
//                     )}
//                     <td className="border border-gray-300 px-4 py-2">{item.name}</td>
//                     <td className="border border-gray-300 px-4 py-2">
//                       <Image
//                         className="rounded-lg"
//                         src={item.image}
//                         alt={item.name}
//                         width={50}
//                         height={50}
//                       />
//                     </td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
//                     <td className="border border-gray-300 px-4 py-2 text-center">{item.price}</td>
//                     <td className="border border-gray-300 px-4 py-2 font-semibold text-center">
//                       {(item.price * item.quantity).toFixed(2)}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Page;

  "use client";

  import React, { useEffect, useState } from "react";
  import Image from "next/image";
  import { Oval } from "react-loader-spinner";

  const API_URL = "https://order-item-31a05-default-rtdb.firebaseio.com/order-item.json";

  const Page = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true); // ✅ Define loading state

    // Fetch orders from Firebase
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          const response = await fetch(API_URL);
          if (!response.ok) throw new Error("Failed to fetch data");

          const data = await response.json();
          if (data) {
            const ordersArray = Object.values(data); // Convert object to array
            setOrders(ordersArray);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, []);

    if (loading) {
        return (
          <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
            <div className="flex flex-col items-center text-blue-900">
              <Oval
                visible={true}
                height={80}
                width={40}
                color="#08318a"
                secondaryColor="#749ffc"
                ariaLabel="loading"
              />
              <p className="text-center mt-2">Loading event details...</p>
            </div>
          </div>
        );
      }

    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-gray-200 text-center">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Order</th>
                  <th className="border border-gray-300 px-4 py-2">Name</th>
                  <th className="border border-gray-300 px-4 py-2">Email</th>
                  <th className="border border-gray-300 px-4 py-2">Phone-no</th>
                  <th className="border border-gray-300 px-4 py-2">Address</th>
                  <th className="border border-gray-300 px-4 py-2">Date</th>
                  <th className="border border-gray-300 px-4 py-2">Item</th>
                  <th className="border border-gray-300 px-4 py-2">Image</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Price (₹)</th>
                  <th className="border border-gray-300 px-4 py-2">Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) =>
                  order.items.map((item, idx) => (
                    <tr
                      key={`${index}-${idx}`}
                      className={`border border-gray-300 ${
                        idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                      }`}
                    >
                      {idx === 0 && (
                        <>
                          <td className="border border-gray-300 px-4 py-2 font-semibold" rowSpan={order.items.length}>
                            {index + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
                            {order.name || "N/A"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
                            {order.email || "N/A"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
                            {order.phone || "N/A"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
                            {order.address || "N/A"}
                          </td>
                          <td className="border border-gray-300 px-4 py-2" rowSpan={order.items.length}>
                            {new Date(order.timestamp).toLocaleDateString()}
                          </td>
                        </>
                      )}
                      <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <Image
                          className="rounded-lg"
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">{item.price}</td>
                      <td className="border border-gray-300 px-4 py-2 font-semibold text-center">
                        {(item.price * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  export default Page;
