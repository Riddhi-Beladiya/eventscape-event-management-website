// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import "./Ourservices.css";
// import Image from "next/image";

// const Ourservices = () => {
//   const router = useRouter();

//   const services = [
//     {
//       id: 1,
//       date: "May 7, 2019",
//       title: "Craft Your Desired Events",
//       image: "/Images/banner1.jpg",
//       description:
//         "Create unforgettable experiences with custom-designed events tailored to your unique vision and preferences.",
//       button: "Order for a Custom Event",
//       route: "/create-your-event", // Add route
//     },
//     {
//       id: 2,
//       date: "May 7, 2019",
//       title: "Book Tickets for Premier Events",
//       image: "/Images/banner3.png",
//       description:
//         "Easily reserve tickets for a variety of premier events, from concerts to conferences, ensuring seamless access to memorable experiences.",
//       button: "Book Ticket for Existing Events",
//       route: "/events",
//     },
//     {
//       id: 3,
//       date: "May 7, 2019",
//       title: "Request for Professional Organizational Support",
//       image: "/Images/banner2.png",
//       description:
//         "Get professional support in planning and executing events of any size, from logistics to on-site coordination, for a successful outcome.",
//       button: "Request for an Event Organizer",
//     },
//     {
//       id: 4,
//       date: "May 7, 2019",
//       title: "Purchase Event Accessories from a Trusted Shop",
//       image: "/Images/banner1.jpg",
//       description:
//         "Elevate your event with premium accessories from a trusted shop, offering everything from decor to practical supplies for an unforgettable experience.",
//       button: "Buy Event Accessories from Shop",
//       route: "/shop",
//     },
//   ];

//   return (
//     <div className="p-10  w-full">
//       <h3 className="font-bold text-3xl mb-6 text-center">
//         Most Popular Events
//       </h3>
//       <div className="w-[70%] p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-20 mx-auto">
//         {services.map((service) => (
//           <div key={service.id} className="ourservices_card mx-auto">
//             <div className="ourservices_card-img-container">
//               <div className="ourservices_card-img">
//                 <div className="relative w-full h-[100%]">
//                   <Image
//                     src={service.image}
//                     alt="image"
//                     layout="fill"
//                     objectFit="cover"
//                     className="h-full w-full"
//                   />
//                   <div className="absolute top-0 left-0 text-gray-100 p-2">
//                     <span className="date">{service.date}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="ourservices_card-body text-center">
//               <h1>{service.title}</h1>
//               <p>{service.description}</p>
//               <div className="ourservices_card-btn">
//                 <button
//                   onClick={() => service.route && router.push(service.route)}
//                   className="btn"
//                 >
//                   {service.button}
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Ourservices;


"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Ourservices = () => {
  const router = useRouter();

  const services = [
    {
      id: 1,
      date: "May 7, 2019",
      title: "Craft Your Desired Events",
      image: "/Images/banner1.jpg",
      description:
        "Create unforgettable experiences with custom-designed events tailored to your unique vision and preferences.",
      button: "Order for a Custom Event",
      route: "/create-your-event",
    },
    {
      id: 2,
      date: "May 7, 2019",
      title: "Book Tickets for Premier Events",
      image: "/Images/banner3.png",
      description:
        "Easily reserve tickets for a variety of premier events, from concerts to conferences, ensuring seamless access to memorable experiences.",
      button: "Book Ticket for Existing Events",
      route: "/events",
    },
    {
      id: 3,
      date: "May 7, 2019",
      title: "Request for Professional Organizational Support",
      image: "/Images/banner2.png",
      description:
        "Get professional support in planning and executing events of any size, from logistics to on-site coordination, for a successful outcome.",
      button: "Request for an Event Organizer",
    },
    {
      id: 4,
      date: "May 7, 2019",
      title: "Purchase Event Accessories from a Trusted Shop",
      image: "/Images/banner1.jpg",
      description:
        "Elevate your event with premium accessories from a trusted shop, offering everything from decor to practical supplies for an unforgettable experience.",
      button: "Buy Event Accessories from Shop",
      route: "/shop",
    },
  ];

  return (
    <div className="p-6 md:p-10 w-full">
      <h3 className="font-bold text-2xl md:text-3xl mb-6 text-center">
        Most Popular Events
      </h3>

      {/* Grid Layout for Desktop, Tablet, and Mobile */}
      <div className="w-[90%] md:w-[60%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 mx-auto">
        {services.map((service) => (
          <div key={service.id} className="max-w-md bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 mx-auto">
            
            {/* Image Container */}
            <div className="relative bg-gray-900">
              <Image
                src={service.image}
                alt={service.title}
                width={600}
                height={300}
                className="w-full h-[220px] md:h-[250px] object-cover transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-2 left-2 btn uppercase">
                {service.date}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-4 flex flex-col justify-between text-center">
              <h1 className="text-lg md:text-xl font-bold uppercase">{service.title}</h1>
              <p className="text-gray-700 text-sm md:text-base mt-2 leading-relaxed">
                {service.description}
              </p>

              {/* Button */}
              <div className="mt-4">
                <button
                  onClick={() => service.route && router.push(service.route)}
                  className="w-full btn py-2"
                >
                  {service.button}
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourservices;
