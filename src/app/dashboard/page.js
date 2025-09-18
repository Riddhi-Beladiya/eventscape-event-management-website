"use client";
import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import "../../Backend-Component/Dashboard.css";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";

const data = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

const USER_API_URL =
  "https://event-login-883aa-default-rtdb.firebaseio.com/login.json";
const EVENT_API_URL =
  "https://event-scape-5af7a-default-rtdb.firebaseio.com/event.json";
const ORDER_API_URL =
  "https://order-item-31a05-default-rtdb.firebaseio.com/order-item.json";
const ACCESSORY_API_URL =
  "https://event-product-default-rtdb.firebaseio.com/product.json";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, eventRes, orderRes, accessoryRes] = await Promise.all([
          fetch(USER_API_URL),
          fetch(EVENT_API_URL),
          fetch(ORDER_API_URL),
          fetch(ACCESSORY_API_URL),
        ]);

        if (!userRes.ok) throw new Error("Failed to fetch user data");
        if (!eventRes.ok) throw new Error("Failed to fetch event data");
        if (!orderRes.ok) throw new Error("Failed to fetch order data");
        if (!accessoryRes.ok) throw new Error("Failed to fetch accessory data");

        const [userData, eventData, orderData, accessoryData] =
          await Promise.all([
            userRes.json(),
            eventRes.json(),
            orderRes.json(),
            accessoryRes.json(),
          ]);

        // Process Users & Tickets
        const usersArray = userData ? Object.values(userData) : [];
        setUsers(usersArray);

        let totalTicketsCount = 0;
        usersArray.forEach((user) => {
          if (user.bookings && Array.isArray(user.bookings)) {
            user.bookings.forEach((booking) => {
              totalTicketsCount += parseInt(booking.quantity) || 0;
            });
          }
        });
        setTotalTickets(totalTicketsCount);

        // Process Events
        setTotalEvents(eventData ? Object.keys(eventData).length : 0);

        // Process Orders
        let totalOrderCount = 0;
        if (orderData) {
          Object.values(orderData).forEach((order) => {
            order.items.forEach((item) => {
              totalOrderCount += parseInt(item.quantity) || 0;
            });
          });
        }
        setTotalOrders(totalOrderCount);

        // Process Accessories
        setAccessories(accessoryData ? Object.values(accessoryData) : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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


  const graphData = [
    { name: "Events", value: totalEvents },
    { name: "Tickets", value: totalTickets },
    { name: "Orders", value: totalOrders },
    { name: "Accessories", value: accessories.length },
  ];
  return (
    <div className="p-6">
      <section>
        <h3 className="text-2xl text-[#111827] font-bold mb-4">Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard icon="👁️" title="Total Events" count={totalEvents} />
          <InfoCard
            icon="⏰"
            title="Total Tickets Booked"
            count={totalTickets}
          />
          <InfoCard icon="👥" title="Total Orders" count={totalOrders} />
          <InfoCard
            icon="👍"
            title="Accessory List"
            count={accessories.length}
          />
        </div>
      </section>
      <section className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RevenueCard users={users} />
          <GraphCard data={graphData} />
        </div>
      </section>
    </div>
  );
};

const InfoCard = ({ icon, title, count }) => (
  <div className="bg-white p-4 rounded shadow-lg hover:bg-blue-100 transition-all">
    <div className="flex items-center justify-between">
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="mt-4">
      <h4 className="text-gray-600">{title}</h4>
      <h1 className="text-3xl font-bold">{count}</h1>
    </div>
  </div>
);

const RevenueCard = ({ users = [] }) => {
  return (
    <div className="bg-white p-6 h-[80%]  overflow-scroll rounded shadow-lg">
      <h3 className="text-lg font-bold mb-4">Login user</h3>
      {Array.isArray(users) && users.length > 0 ? (
        users.map((user, index) => (
          <div key={index} className="flex items-center mb-4">
            <Image
              src={user?.image || "/Images/profile/1profile.png"}
              alt="profile"
              width={100}
              height={100}
              className="rounded-full h-24 w-24"
            />
            <div className="ml-4">
              <h3 className="text-xl font-bold">{user?.email || "Guest User"}</h3>
              <h1 className="text-2xl">
                3.5M <small className="text-gray-500">Subscribers</small>
              </h1>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No users found.</p>
      )}
    </div>
  );
};



const GraphCard = ({ data }) => (
  <div className="bg-white p-6 min-h-[300px] md:h-[80%] overflow-hidden rounded shadow-lg w-full">
    <h3 className="text-lg font-bold mb-4">Graph</h3>
    <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default Page;

// "use client";
// import Image from "next/image";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import "../../Backend-Component/Dashboard.css";
// import { Oval } from "react-loader-spinner";
// import { useEffect, useState } from "react";

// const data = [
//   { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
//   { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
//   { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
//   { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
//   { name: "May", uv: 1890, pv: 4800, amt: 2181 },
//   { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
//   { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
// ];

// const USER_API_URL =
//   "https://event-login-883aa-default-rtdb.firebaseio.com/login.json";
// const EVENT_API_URL =
//   "https://event-scape-5af7a-default-rtdb.firebaseio.com/event.json";
// const ORDER_API_URL =
//   "https://order-item-31a05-default-rtdb.firebaseio.com/order-item.json";
// const ACCESSORY_API_URL =
//   "https://event-product-default-rtdb.firebaseio.com/product.json";

// const Page = () => {
//   const [users, setUsers] = useState([]);
//   const [totalEvents, setTotalEvents] = useState(0);
//   const [totalTickets, setTotalTickets] = useState(0);
//   const [totalOrders, setTotalOrders] = useState(0);
//   const [accessories, setAccessories] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(USER_API_URL);
//         if (!response.ok) throw new Error("Failed to fetch user data");

//         const data = await response.json();
//         const usersArray = data ? Object.values(data) : [];
//         setUsers(usersArray);

//         let totalTicketsCount = 0;
//         usersArray.forEach((user) => {
//           if (user.bookings && Array.isArray(user.bookings)) {
//             user.bookings.forEach((booking) => {
//               totalTicketsCount += parseInt(booking.quantity) || 0;
//             });
//           }
//         });

//         setTotalTickets(totalTicketsCount);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     const fetchEvents = async () => {
//       try {
//         const response = await fetch(EVENT_API_URL);
//         if (!response.ok) throw new Error("Failed to fetch event data");

//         const data = await response.json();
//         setTotalEvents(data ? Object.keys(data).length : 0);
//       } catch (error) {
//         console.error("Error fetching event data:", error);
//       }
//     };

//     const fetchOrders = async () => {
//       try {
//         const response = await fetch(ORDER_API_URL);
//         if (!response.ok) throw new Error("Failed to fetch order data");

//         const data = await response.json();
//         if (data) {
//           const ordersArray = Object.values(data);
//           let totalOrderCount = 0;

//           ordersArray.forEach((order) => {
//             order.items.forEach((item) => {
//               totalOrderCount += parseInt(item.quantity) || 0;
//             });
//           });

//           setTotalOrders(totalOrderCount);
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     const fetchAccessories = async () => {
//       try {
//         const response = await fetch(ACCESSORY_API_URL);
//         console.log("Accessory API Response Status:", response.status);

//         if (!response.ok)
//           throw new Error(
//             `Failed to fetch accessory data (Status: ${response.status})`
//           );

//         const data = await response.json();
//         console.log("Fetched accessories data:", data);

//         setAccessories(data ? Object.values(data) : []);
//       } catch (error) {
//         console.error("Error fetching accessory data:", error.message);
//       }
//     };

//     Promise.all([
//       fetchUsers(),
//       fetchEvents(),
//       fetchOrders(),
//       fetchAccessories(),
//     ]).finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
//         <div className="flex flex-col items-center text-blue-900">
//           <Oval
//             visible={true}
//             height={80}
//             width={40}
//             color="#08318a"
//             secondaryColor="#749ffc"
//             ariaLabel="loading"
//           />
//           <p className="text-center mt-2">Loading event details...</p>
//         </div>
//       </div>
//     );
//   }

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const [loading, setLoading] = useState(true);
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
//         <div className="flex flex-col items-center text-blue-900">
//           <Oval
//             visible={true}
//             height={80}
//             width={40}
//             color="#08318a"
//             secondaryColor="#749ffc"
//             ariaLabel="loading"
//           />
//           <p className="text-center mt-2">Loading event details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <section>
//         <h3 className="text-2xl text-[#111827] font-bold mb-4">Overview</h3>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           <div className="bg-white p-4 rounded shadow-lg hover:bg-blue-100 transition-all">
//             <div className="flex items-center justify-between">
//               <span className="text-2xl">👁️</span>
//             </div>
//             <div className="mt-4">
//               <h4 className="text-gray-600">Total Events</h4>
//               <h1 className="text-3xl font-bold">{totalEvents}</h1>
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded shadow-lg hover:bg-blue-100 transition-all">
//             <div className="flex items-center justify-between">
//               <span className="text-2xl">⏰</span>
//             </div>
//             <div className="mt-4">
//               <h4 className="text-gray-600">Total Tickets Booked</h4>
//               <h1 className="text-3xl font-bold">{totalTickets}</h1>
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded shadow-lg hover:bg-blue-100 transition-all">
//             <div className="flex items-center justify-between">
//               <span className="text-2xl">👥</span>
//             </div>
//             <div className="mt-4">
//               <h4 className="text-gray-600">Total Orders</h4>
//               <h1 className="text-3xl font-bold">{totalOrders}</h1>
//             </div>
//           </div>
//           <div className="bg-white p-4 rounded shadow-lg hover:bg-blue-100 transition-all">
//             <div className="flex items-center justify-between">
//               <span className="text-2xl">👍</span>
//             </div>
//             <div className="mt-4">
//               <h4 className="text-gray-600">Accessory List</h4>
//              <h1 className="text-3xl font-bold">{accessories.length}</h1>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="mt-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-bold mb-4">Total Revenue</h3>
//             <div className="flex items-center">
//               <Image
//                 src="/Images/profile/1profile.png"
//                 alt="profile"
//                 width={100}
//                 height={100}
//                 className="rounded-full h-24 w-24"
//               />
//               <div className="ml-4">
//                 <h3 className="text-xl font-bold">Mohsen Alizade</h3>
//                 <h1 className="text-2xl">
//                   3.5M <small className="text-gray-500">Subscribers</small>
//                 </h1>
//               </div>
//               <div className="ml-auto text-right">
//                 <h4 className="text-gray-600">Total income</h4>
//                 <h2 className="text-3xl font-bold">$70.859</h2>
//               </div>
//             </div>
//           </div>
//           <div className="bg-white p-6 rounded shadow-lg">
//             <h3 className="text-lg font-bold mb-4">Graph</h3>
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex space-x-4">
//                 <div className="text-main">👁️</div>
//                 <div className="text-success">⏰</div>
//               </div>
//               <div>
//                 <select className="border p-2 rounded">
//                   <option value="">September</option>
//                 </select>
//               </div>
//             </div>
//             <div className="graph-board">
//               <ResponsiveContainer width="100%" height={300}>
//                 <AreaChart data={data}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Area
//                     type="monotone"
//                     dataKey="uv"
//                     stroke="#8884d8"
//                     fill="#8884d8"
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Page;

// "use client";

// import Image from "next/image";
// import { Oval } from "react-loader-spinner";
// import { useEffect, useState } from "react";

// const USER_API_URL = "https://event-login-883aa-default-rtdb.firebaseio.com/login.json";
// const EVENT_API_URL = "https://event-scape-5af7a-default-rtdb.firebaseio.com/event.json";
// const ORDER_API_URL = "https://order-item-31a05-default-rtdb.firebaseio.com/order-item.json";
// const ACCESSORY_API_URL = "https://event-product-default-rtdb.firebaseio.com/product.json";

// const Page = () => {
// const [loading, setLoading] = useState(true);
// const [users, setUsers] = useState([]);
// const [totalEvents, setTotalEvents] = useState(0);
// const [totalTickets, setTotalTickets] = useState(0);
// const [totalOrders, setTotalOrders] = useState(0);
// const [accessories, setAccessories] = useState([]);

// useEffect(() => {
//   const fetchUsers = async () => {
//     try {
//       const response = await fetch(USER_API_URL);
//       if (!response.ok) throw new Error("Failed to fetch user data");

//       const data = await response.json();
//       const usersArray = data ? Object.values(data) : [];
//       setUsers(usersArray);

//       let totalTicketsCount = 0;
//       usersArray.forEach((user) => {
//         if (user.bookings && Array.isArray(user.bookings)) {
//           user.bookings.forEach((booking) => {
//             totalTicketsCount += parseInt(booking.quantity) || 0;
//           });
//         }
//       });

//       setTotalTickets(totalTicketsCount);
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch(EVENT_API_URL);
//       if (!response.ok) throw new Error("Failed to fetch event data");

//       const data = await response.json();
//       setTotalEvents(data ? Object.keys(data).length : 0);
//     } catch (error) {
//       console.error("Error fetching event data:", error);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch(ORDER_API_URL);
//       if (!response.ok) throw new Error("Failed to fetch order data");

//       const data = await response.json();
//       if (data) {
//         const ordersArray = Object.values(data);
//         let totalOrderCount = 0;

//         ordersArray.forEach(order => {
//           order.items.forEach(item => {
//             totalOrderCount += parseInt(item.quantity) || 0;
//           });
//         });

//         setTotalOrders(totalOrderCount);
//       }
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const fetchAccessories = async () => {
//     try {
//       const response = await fetch(ACCESSORY_API_URL);
//       console.log("Accessory API Response Status:", response.status);

//       if (!response.ok) throw new Error(`Failed to fetch accessory data (Status: ${response.status})`);

//       const data = await response.json();
//       console.log("Fetched accessories data:", data);

//       setAccessories(data ? Object.values(data) : []);
//     } catch (error) {
//       console.error("Error fetching accessory data:", error.message);
//     }
//   };

//   Promise.all([fetchUsers(), fetchEvents(), fetchOrders(), fetchAccessories()])
//     .finally(() => setLoading(false));
// }, []);

// if (loading) {
//   return (
//     <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
//       <div className="flex flex-col items-center text-blue-900">
//         <Oval visible={true} height={80} width={40} color="#08318a" secondaryColor="#749ffc" ariaLabel="loading" />
//         <p className="text-center mt-2">Loading event details...</p>
//       </div>
//     </div>
//   );
// }

//   return (
//     <div className="p-6">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {/* Total Events */}
//         <div className="bg-white p-4 rounded shadow-lg hover:bg-blue-100 transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-2xl">📅</span>
//           </div>
//           <div className="mt-4">
//             <h4 className="text-gray-600">Total Events</h4>
//             <h1 className="text-3xl font-bold">{totalEvents}</h1>
//           </div>
//         </div>

//         {/* Total Tickets Booked */}
//         <div className="bg-white p-4 rounded shadow-lg hover:bg-green-100 transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-2xl">🎟️</span>
//           </div>
//           <div className="mt-4">
//             <h4 className="text-gray-600">Total Tickets Booked</h4>
//             <h1 className="text-3xl font-bold">{totalTickets}</h1>
//           </div>
//         </div>

//         {/* Total Orders */}
//         <div className="bg-white p-4 rounded shadow-lg hover:bg-yellow-100 transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-2xl">📦</span>
//           </div>
//           <div className="mt-4">
{
  /* <h4 className="text-gray-600">Total Tickets Booked</h4> */
}
//             <h1 className="text-3xl font-bold">{totalTickets}</h1>
//             <h4 className="text-gray-600">Total Orders</h4>
//             <h1 className="text-3xl font-bold">{totalOrders}</h1>
//           </div>
//         </div>

//         {/* Accessory List */}
//         <div className="bg-white p-4 rounded shadow-lg hover:bg-purple-100 transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-2xl">🛍️</span>
//           </div>
//           <div className="mt-4">
{
  /* <h4 className="text-gray-600">Total Tickets Booked</h4> */
}
//             <h1 className="text-3xl font-bold">{totalTickets}</h1>
//             <h4 className="text-gray-600">Total Orders</h4>
//             <h1 className="text-3xl font-bold">{totalOrders}</h1>
//             <h4 className="text-gray-600">Accessory List</h4>
//             <h1 className="text-3xl font-bold">{accessories.length}</h1>
//           </div>
//         </div>
//       </div>

//       {/* Users List */}
// <section className="mt-8">
//   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//     {users.length > 0 ? (
// users.map((user, index) => (
//         <div key={index} className="bg-white p-6 rounded shadow-lg">
//           <h3 className="text-lg font-bold mb-4">User Details</h3>
//           <div className="flex items-center">
//             <Image
//               src={user.image || "/Images/profile/1profile.png"}
//               alt="profile"
//               width={100}
//               height={100}
//               className="rounded-full h-24 w-24"
//             />
//             <div className="ml-4">
//               <h3 className="text-xl font-bold">{user.email || "Guest User"}</h3>
//             </div>
//           </div>
//         </div>
//       ))
// users.map((user, index) => (

//     ) : (
//       <p className="text-gray-500 text-center">No users found.</p>
//     )}
//   </div>
// </section>
//     </div>
//   );
// };

// export default Page;
