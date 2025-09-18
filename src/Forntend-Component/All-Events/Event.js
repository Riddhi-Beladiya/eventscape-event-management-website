// "use client"; // Ensure client-side behavior

// import Image from "next/image";
// import React from "react";
// import { useRouter } from "next/navigation";
// import "./Event.css";

// const Event = ({ event }) => {
//   const router = useRouter();

//   if (!event) {
//     console.error("Event prop is undefined!");
//     return <div>Error: Event data is missing.</div>;
//   }

//   const handleClick = () => {
//     router.push(`/event-details?id=${event.id}`);
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString(undefined, {
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString(undefined, {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div
//       className="card overflow-auto h-[20%] mx-[5px] cursor-pointer"
//       onClick={handleClick}
//     >
//       <div className="relative w-full h-[20vh] md:h-[30vw] lg:h-[26rem] overflow-hidden rounded-lg shadow-lg transition-shadow duration-300 hover:shadow-xl">
//   <Image
//     src={event.image || "/fallback-image.jpg"}
//     alt={event.title || "Event Image"}
//     width={1200}
//     height={1900}
//     quality={90}
//     className="w-full h-full object-cover"
//   />
// </div>

//       <div className="card--text">
//         <div className="text--container">
//           <div className="text--header">
//             <h2 className="text--title">{event.title}</h2>
//             <p className="text--subtitle">
//               {event.start
//                 ? `${formatDate(event.start)} at ${formatTime(event.start)}`
//                 : "Date Unavailable"}
//             </p>
//           </div>
//           <div className="text--details">
//             <p className="text--description indent-8">{event.description}</p>
//             <a href={`/event-details?id=${event.id}`} className="text--link">
//               Event Details
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Event;


"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const Event = ({ event }) => {
  const router = useRouter();

  if (!event) {
    console.error("Event prop is undefined!");
    return <div className="text-red-500">Error: Event data is missing.</div>;
  }

  const handleClick = () => {
    router.push(`/event-details?id=${event.id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className="group relative w-full max-w-sm cursor-pointer rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl bg-white overflow-hidden"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative w-full h-52 md:h-72 lg:h-80">
        <Image
          src={event.image || "/fallback-image.jpg"}
          alt={event.title || "Event Image"}
          width={1200}
          height={800}
          quality={90}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text Content - Hidden Initially, Appears on Hover */}
      <div style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} className="absolute bottom-0 w-full  backdrop-blur-md p-4 transition-transform duration-200 translate-y-full group-hover:translate-y-0">
        <h2 className="text-lg font-bold uppercase tracking-wide text-gray-100">{event.title}</h2>
        <p className="text-sm text-white">
          {event.start
            ? `${formatDate(event.start)} at ${formatTime(event.start)}`
            : "Date Unavailable"}
        </p>
        <p className="text-black mt-2 line-clamp-3">{event.description}</p>
        <a
          href={`/event-details?id=${event.id}`}
          className="text-white font-medium mt-2 inline-block hover:underline"
        >
          Event Details
        </a>
      </div>
    </div>
  );
};

export default Event;


