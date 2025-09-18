// "use client"
// import React from "react";
// import "./Innovatesphere.css";
// import { useRouter } from "next/navigation";

// const Innovatesphere = () => {
//   const router = useRouter();

//   const handleNavigation = () => {
//     router.push("/events");
//   };

//   return (
//     <div className="w-full">
//       <div className="relative h-[75vh] bg-fixed bg-cover bg-center bg-[url('/Images/banner4.png')]">
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//         <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-4">
//           <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
//             InnovateSphere - Tech & Beyond Summit
//           </h1>
//           <p className="mt-4 text-2xl flex items-center gap-4">
//             by
//             <button className="btn text-lg">
//               Data Defenders
//             </button>
//           </p>
//         </div>
//       </div>
//       <div className="bg-blue-100">
//         <div className="relative mx-auto w-[70%] md:w-[60%] -top-16 md:-top-20 p-8 md:p-16  bg-white text-gray-400 shadow-lg">
//           <div className="mx-auto">
//             <div className="flex justify-between">
//               <div className="text-sm  md:text-base/10">
//                 <span className="text-xl md:text-4xl">📆</span>
//                 <h4 className="text-[15px] md:text-2xl text-black font-bold">
//                   Upcoming Events
//                 </h4>
//                 <p className="text-sm md:text-[17px]"> Mark Your Calendar</p>
//               </div>
//               <div className="text-sm  md:text-base/10">
//                 <span className="text-xl md:text-4xl">📍</span>
//                 <h4 className="text-[15px] md:text-2xl text-black font-bold">
//                   Your Desired Venue
//                 </h4>
//                 <p className="text-sm md:text-[17px]"> Bangladesh</p>
//               </div>
//               <div className="text-sm  md:text-base/10">
//                 <span className="text-xl md:text-4xl">💲</span>
//                 <h4 className="text-[15px] md:text-2xl text-black font-bold">Get Discounts</h4>
//                 <button
//                   className="btn"
//                   onClick={handleNavigation}
//                 >
//                   Go to Events
//                 </button>{" "}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="max-w-6xl -top-24 pb-10 p-2 mx-auto text-base/10">
//           <span className="text-xl font-semibold text-[#2d58c4] py-3 ">
//             InnovateSphere - Tech & Beyond Summit
//           </span>
//           <p className="text-lg text-gray-600   py-3 ">
//             Dive into the future of technology at InnovateSphere, the ultimate
//             summit for tech enthusiasts, innovators, and industry leaders.
//             Explore the latest breakthroughs, engage with cutting-edge ideas,
//             and connect with visionaries who are shaping the landscape of
//             tomorrow.
//           </p>
//         </div>
//       </div>

//       {/* Third Fixed Background */}
//       <div className="relative h-[75vh] bg-fixed bg-cover bg-center bg-[url('/Images/banner5.png')]">
//         {/* Overlay for better readability */}
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>

//         {/* Centered Content */}
//         <div className="relative flex  w-full justify-center gap-10 items-center h-full px-4">
//           <h3 className="text-xl w-[30%] font-semibold text-gray-300 p-10 max-w-lg  text-center">
//             FOR EXCLUSIVE BENEFITS, INSIDER NEWS, AND OUR UPCOMING EVENTS
//             SUBSCRIBE TO OUR NEWSLETTER
//           </h3>

//           <form
//             role="search"
//             method="get"
//             action=""
//             className="mt-4 p-1  md:p-10 w-[40%] text-sm sm:text-base md:text-lg lg:text-xl "
//           >
//             <div className="input-container">
//               <input
//                 type="text"
//                 value=""
//                 name="s"
//                 placeholder="Search entire website..."
//                 className="search-input"
//                 readOnly
//               />
//               <button type="submit" className="search-submit" name="submit">
//                 <span className="text-xl">⌕</span>
//               </button>
//             </div>
//             <p className="text-gray-300 text-lg  mt-3 p-2 indent-8">
//               Your personal data is to be used by the legal entity Dream Craft
//               Events in order to provide you with the Dream Craft Events
//               services that you requested, to send you information on Dream
//               Craft Events activities and services and to provide offers
//               tailored to your interests.
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Innovatesphere;



"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "./Innovatesphere.css";

const Innovatesphere = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/events");
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[75vh] bg-fixed bg-cover bg-center bg-[url('/Images/banner4.png')]">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center h-full text-center text-white px-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
            InnovateSphere - Tech & Beyond Summit
          </h1>
          <p className="mt-4 text-xl md:text-2xl flex flex-col md:flex-row items-center gap-2">
            by <button className="btn text-lg">Data Defenders</button>
          </p>
        </div>
      </div>

      {/* Event Info Section */}
      <div className="bg-blue-100 px-4 py-10">
      
      
        <div className="relative mx-auto w-[90%] md:w-[70%] lg:w-[60%] -top-24 md:-top-24 p-6 md:p-12 bg-white text-gray-600 shadow-lg rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <span className="text-3xl md:text-4xl">📆</span>
              <h4 className="text-lg md:text-xl lg:text-2xl text-black font-bold">
                Upcoming Events
              </h4>
              <p className="text-sm md:text-xs lg:text-lg">Mark Your Calendar</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl md:text-4xl">📍</span>
              <h4 className="text-lg md:text-xl lg:text-2xl text-black font-bold">
                Your Desired Venue
              </h4>
              <p className="text-sm md:text-xs lg:text-lg">Bangladesh</p>
            </div>
            <div className="space-y-2">
              <span className="text-3xl md:text-4xl">💲</span>
              <h4 className="text-lg md:text-xl lg:text-2xl text-black font-bold">
                Get Discounts
              </h4>
              <button
                className="btn bg-blue-600 text-white px-3 py-1 rounded-md mt-2 hover:bg-blue-700 transition"
                onClick={handleNavigation}
              >
                Go to Events
              </button>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="max-w-6xl mx-auto p-6 mt-0 md:p-2 text-center md:text-left">
          <span className="text-xl font-semibold text-[#2d58c4]">
            InnovateSphere - Tech & Beyond Summit
          </span>
          <p className="text-lg text-gray-600 mt-3">
            Dive into the future of technology at InnovateSphere, the ultimate
            summit for tech enthusiasts, innovators, and industry leaders.
            Explore the latest breakthroughs, engage with cutting-edge ideas,
            and connect with visionaries who are shaping the landscape of
            tomorrow.
          </p>
        </div>
      </div>

      {/* Subscription Section */}
      <div className="relative h-[75vh] bg-fixed bg-cover bg-center bg-[url('/Images/banner5.png')]">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex flex-col md:flex-row w-full justify-center items-center h-full px-3 space-y-6 md:space-y-0 md:space-x-8">
          <h3 className="text-xl md:text-2xl w-full md:w-[40%] text-gray-300 text-center md:text-left px-4">
            FOR EXCLUSIVE BENEFITS, INSIDER NEWS, AND OUR UPCOMING EVENTS,
            SUBSCRIBE TO OUR NEWSLETTER
          </h3>

          <form className="w-full max-w-lg md:w-[60%] xl:w-[50%] bg-white p-6 rounded-lg shadow-md flex flex-col space-y-3">
            <label htmlFor="email" className="text-gray-700 font-medium">
              Subscribe to Our Newsletter
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email..."
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="btn py-2"
            >
              Subscribe
            </button>
            <p className="text-gray-600 text-sm">
              Your personal data is used by Dream Craft Events to provide you
              with requested services and tailored offers.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Innovatesphere;
