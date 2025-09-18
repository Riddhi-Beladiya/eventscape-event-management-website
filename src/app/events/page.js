// import React from "react";
// import Event from "@/Component/All-Events/Event";
// import "../../Component/All-Events/Event.css";
// import { eventsData } from "@/Component/All-Events/EventsData ";

// const Events = () => {
//   return (
//     <div className=" overflow-auto p-2">
//       <h1 className="text-3xl font-bold  text-center bg-[url('/Images/allevent.png')] bg-cover bg-center text-white p-20">
//         All Events
//       </h1>

//       <div className="w-full p-6 gap-10 flex">
//         <div className=" mb-6 w-[20%]">
//           <div className="flex h-screen text-start  flex-col gap-2 border rounded-xl p-5 shadow-[rgba(0,0,0,0.2)_0px_12px_28px_0px,rgba(0,0,0,0.1)_0px_2px_4px_0px,rgba(255,255,255,0.05)_0px_0px_0px_1px_inset]">
//           <h1 className="text-2xl bg-[#111827] w-auto text-white p-4  font-bold ">Category </h1>
//             <button className="border-b h-[3rem] hover:bg-[#111827] hover:text-white pl-3 text-start">All</button>
//             <button className="border-b h-[3rem] hover:bg-[#111827] hover:text-white pl-3 text-start">Technology</button>
//             <button className="border-b h-[3rem] hover:bg-[#111827] hover:text-white pl-3 text-start">Health</button>
//             <button className="border-b h-[3rem] hover:bg-[#111827] hover:text-white pl-3 text-start">Business</button>
//             <button className="border-b h-[3rem] hover:bg-[#111827] hover:text-white pl-3 text-start">Others</button>
//       </div>
//         </div>
//         <div className="grid w-full grid-cols-4 gap-6">
//           {eventsData.map((event) => (
//             <Event key={event.id} event={event} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Events;

// "use client";

// import { useEffect, useState } from "react";
// import Event from "@/Forntend-Component/All-Events/Event";
// import "../../Forntend-Component/All-Events/Event.css";
// import { fetchEvents } from "@/app/api/Eventapi";
// import { Oval } from "react-loader-spinner"; // Ensure this is installed

// const Page = () => {
//   const [eventsData, setEventsData] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [loading, setLoading] = useState(true); // ✅ Loading state

//   useEffect(() => {
//     const getEvents = async () => {
//       setLoading(true); // ✅ Start loading
//       try {
//         const events = await fetchEvents();
//         console.log("Fetched Events:", events);
//         setEventsData(events);
//         setFilteredEvents(events);
//       } catch (error) {
//         console.error("Error fetching events:", error);
//       }
//       setLoading(false); // ✅ Stop loading
//     };

//     getEvents();
//   }, []);
//   const handleFilter = (category) => {
//     if (category === "Others") {
//       // Show only events that are not in Technology, Health, or Business categories
//       setFilteredEvents(
//         eventsData.filter(
//           (event) =>
//             !["Technology", "Health", "Business", "All"].includes(
//               event.category
//             )
//         )
//       );
//     } else if (category === "All") {
//       setFilteredEvents(eventsData); // Show all events
//     } else {
//       setFilteredEvents(
//         eventsData.filter((event) => event.category === category)
//       );
//     }
//     setSelectedCategory(category);
//   };

//   return (
//     <div className="overflow-auto pt-[3.8%] p-2">
//       <h1 className="text-3xl font-bold text-center bg-[url('/Images/allevent.png')] bg-cover bg-center text-white p-20">
//         All Events
//       </h1>

//       <div className="w-full p-6 gap-10 flex">
//         {/* Sidebar Filters */}
//         <div className="mb-6 w-[20%]">
//           <div className="flex h-auto text-start flex-col gap-2 border rounded-xl p-5 shadow-lg">
//             <h1 className="text-2xl bg-[#111827] w-auto text-white p-4 font-bold">
//               Category
//             </h1>
//             {["All", "Technology", "Health", "Business", "Others"].map(
//               (category) => (
//                 <button
//                   key={category}
//                   className={`border-b h-[3rem] text-start pl-3 hover:bg-[#111827] hover:text-white ${
//                     selectedCategory === category
//                       ? "bg-[#111827] text-white"
//                       : ""
//                   }`}
//                   onClick={() => handleFilter(category)}
//                 >
//                   {category}
//                 </button>
//               )
//             )}
//           </div>
//         </div>

//         {/* Event Grid / Loader */}
//         <div className="grid w-full grid-cols-4 gap-6">
//           {loading ? (
//             <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
//               <div className="flex flex-col items-center text-blue-900">
//                 <Oval
//                   visible={true}
//                   height={80}
//                   width={40}
//                   color="#08318a"
//                   secondaryColor="#749ffc"
//                   ariaLabel="loading"
//                 />
//                 <p className="text-center mt-2">Loading event details...</p>
//               </div>
//             </div>
//           ) : filteredEvents.length > 0 ? (
//             filteredEvents.map((event) => (
//               <Event key={event.id} event={event} />
//             ))
//           ) : (
//             <p className="text-center text-gray-500 col-span-4">
//               No events available.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;




"use client";

import { useEffect, useState } from "react";
import Event from "@/Forntend-Component/All-Events/Event";
import "../../Forntend-Component/All-Events/Event.css";
import { fetchEvents } from "@/app/api/Eventapi";
import { Oval } from "react-loader-spinner"; 
import { FaBars } from "react-icons/fa"; 

const Page = () => {
  const [eventsData, setEventsData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false); // ✅ For responsive sidebar

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true);
      try {
        const events = await fetchEvents();
        setEventsData(events);
        setFilteredEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
      setLoading(false);
    };
    getEvents();
  }, []);

  const handleFilter = (category) => {
    if (category === "Others") {
      setFilteredEvents(
        eventsData.filter(
          (event) =>
            !["Technology", "Health", "Business", "All"].includes(
              event.category
            )
        )
      );
    } else if (category === "All") {
      setFilteredEvents(eventsData);
    } else {
      setFilteredEvents(eventsData.filter((event) => event.category === category));
    }
    setSelectedCategory(category);
    setShowFilters(false); // Close sidebar on mobile after selection
  };

  return (
    <div className="overflow-auto pt-[3.8%] p-2">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center bg-[url('/Images/allevent.png')] bg-cover bg-center text-white p-20">
        All Events
      </h1>

      {/* Responsive Layout */}
      <div className="flex flex-col md:flex-row w-full p-4 gap-6">
        {/* Mobile Filter Toggle Button */}
        <button
          className="md:hidden bg-[#111827] text-white p-3 rounded-lg flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaBars /> Filter Events
        </button>

        {/* Sidebar Filters (Responsive) */}
        <div
          className={`absolute md:relative bg-white shadow-lg md:shadow-none transition-transform md:translate-x-0 md:flex w-[80%] md:w-[25%] lg:w-[20%] p-5 border rounded-xl z-10
            ${showFilters ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-2xl bg-[#111827] text-white p-4 font-bold">Category</h1>
            {["All", "Technology", "Health", "Business", "Others"].map((category) => (
              <button
                key={category}
                className={`border-b h-12 text-start pl-3 hover:bg-[#111827] hover:text-white transition ${
                  selectedCategory === category ? "bg-[#111827] text-white" : ""
                }`}
                onClick={() => handleFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Event Grid / Loader */}
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
              <div className="flex flex-col items-center text-blue-900">
                <Oval visible={true} height={80} width={40} color="#08318a" secondaryColor="#749ffc" ariaLabel="loading" />
                <p className="text-center mt-2">Loading event details...</p>
              </div>
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => <Event key={event.id} event={event} />)
          ) : (
            <p className="text-center text-gray-500 col-span-4">No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
