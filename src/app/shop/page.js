// "use client";
// import React, { useEffect, useState } from "react";
// import "../../Forntend-Component/All-Events/Event.css";
// import AccessoriesData from "@/Forntend-Component/All-Events/Event-Accessories/AccessoriesData";
// import { IoCartOutline, IoSearch } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";
// import { Oval } from "react-loader-spinner";

// const Page = () => {
//   const router = useRouter();
//   const cartItems = useSelector((state) => state.cart.cartItems) || [];
//   const [cartCount, setCartCount] = useState(0);

//   useEffect(() => {
//     setCartCount(new Set(cartItems.map((item) => item.id)).size);
//   }, [cartItems]);

//   const handleClick = () => {
//     router.push("/add-cart");
//   };

//     const [loading, setLoading] = useState(true);
  
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setLoading(false);
//       }, 2000);
  
//       return () => clearTimeout(timer);
//     }, []);
  
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
//           <div className="flex flex-col items-center text-blue-900">
//             <Oval
//               visible={true}
//               height={80}
//               width={40}
//               color="#08318a"
//               secondaryColor="#749ffc"
//               ariaLabel="loading"
//             />
//             <p className="text-center mt-2">Loading event details...</p>
//           </div>
//         </div>
//       );
//     }

//   return (
//     <div className="overflow-auto pt-[3.8%]  p-2">
//       <h1
//         className="text-3xl font-bold text-center text-white p-20"
//         style={{
//           backgroundImage: "url('/Images/eventaccessorie.png')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       >
//         Popular Event Accessories
//       </h1>

//       <div className="w-full p-3 flex gap-5 items-center justify-center">
//         <div className="flex my-5 w-[50%] border-2 border-gray-300 rounded-xl overflow-hidden">
//           <input
//             type="text"
//             name="s"
//             placeholder="Search our product..."
//             className="p-3 w-full outline-none"
//           />
//           <button type="submit" className="btn">
//             <IoSearch className="text-xl" />
//           </button>
//         </div>

//         <div className="relative">
//           <button className="btn flex gap-1" onClick={handleClick}>
//             <span>My Cart</span>
//             <IoCartOutline className="text-2xl" />
//           </button>
//           {cartCount > 0 && (
//             <span className="text-sm absolute -top-3 -right-2 text-white bg-blue-900 py-1 px-2 rounded-full">
//               {cartCount}
//             </span>
//           )}
//         </div>
//       </div>

//       <div>
//         <AccessoriesData />
//       </div>
//     </div>
//   );
// };

// export default Page;



"use client";
import React, { useEffect, useState } from "react";
import "../../Forntend-Component/All-Events/Event.css";
import AccessoriesData from "@/Forntend-Component/All-Events/Event-Accessories/AccessoriesData";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";

const Page = () => {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setCartCount(new Set(cartItems.map((item) => item.id)).size);
  }, [cartItems]);

  const handleClick = () => {
    router.push("/add-cart");
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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
    <div className="overflow-auto pt-[3.8%] p-2">
      <h1
        className="text-3xl font-bold text-center text-white p-20"
        style={{
          backgroundImage: "url('/Images/eventaccessorie.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        Popular Event Accessories
      </h1>

      {/* Search Bar */}
      <div className="w-full p-3 flex gap-5 items-center justify-center">
        <div className="flex my-5 w-[50%] border-2 border-gray-300 rounded-xl overflow-hidden">
          <input
            type="text"
            name="s"
            placeholder="Search our product..."
            className="p-3 w-full outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn">
            <IoSearch className="text-xl" />
          </button>
        </div>

        <div className="relative">
          <button className="btn flex gap-1" onClick={handleClick}>
            <span>My Cart</span>
            <IoCartOutline className="text-2xl" />
          </button>
          {cartCount > 0 && (
            <span className="text-sm absolute -top-3 -right-2 text-white bg-blue-900 py-1 px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </div>
      </div>

      {/* Passing Search Query to AccessoriesData */}
      <div>
        <AccessoriesData searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Page;
