// "use client";
// import React, { useState } from "react";

// const Page = () => {
//   const [activeSection, setActiveSection] = useState("profileDetails");

//   const showSection = (section) => {
//     setActiveSection(section);
//   };

//   return (
//     <section className="pt-[3.8%] h-screen flex items-center justify-center">
//       <div className="w-[70%]  mx-auto">
//         <div className="flex flex-wrap">
//           <div className="w-full lg:w-1/3 px-4">
//             <div className="bg-white shadow-md rounded-lg p-6">
//               <div className="flex flex-col items-center text-center">
//                 <img
//                   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbEsykx-0fhTred6UwHDYtMFd2UgTJCG4gaklT1dx4suRO4_n5LJr4Gg28kquSX5fpNo&usqp=CAU"
//                   alt="Admin"
//                   className="rounded-full p-1 bg-yellow-500"
//                   width="110"
//                 />
//                 <div className="mt-3">
//                   <h4 className="text-lg py-1 font-semibold">Jyoti</h4>
//                   <p className="text-gray-600 py-1">+91 7493658737</p>
//                   <p className="text-gray-500 py-1">Delhi, NCR</p>
//                 </div>
//               </div>
//               <div className="mt-4 btn text-center">
//                     Logout
//               </div>
//             </div>
//           </div>
//           <div className="w-full lg:w-2/3 px-4">
//             {activeSection === "profileDetails" && (
//               <div className="bg-white shadow-md rounded-lg p-6">
//                 <h5 className="text-xl font-semibold mb-4">
//                   Profile Information
//                 </h5>
//                 <p className="py-2">
//                   <strong>Name:</strong> Jyoti
//                 </p>
//                 <p className="py-2">
//                   <strong>Email Address:</strong> jyoti@gmail.com
//                 </p>
//                 <p className="py-2">
//                   <strong>Contact:</strong> +91 7493658737
//                 </p>
//                 <p className="py-2">
//                   <strong>Date of Birth:</strong> 02-03-1999
//                 </p>
//                 <p className="py-2">
//                   <strong>Gender:</strong> Female
//                 </p>
//                 <p className="py-2">
//                   <strong>City:</strong> Delhi, NCR
//                 </p>
//               </div>
//             )}
//             {activeSection === "orderDetails" && (
//               <div className="bg-white shadow-md rounded-lg p-6">
//                 <h5 className="text-xl font-semibold mb-4">Orders</h5>
//               </div>
//             )}
//             {activeSection === "addressBook" && (
//               <div className="bg-white shadow-md rounded-lg p-6">
//                 <h5 className="text-xl font-semibold mb-4">Address Book</h5>
//                 <button
//                   className="bg-indigo-600 text-white py-2 px-4 rounded-md"
//                   onClick={() => showSection("addAddress")}
//                 >
//                   Add Address
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Page;

"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
  const [activeSection, setActiveSection] = useState("profileDetails");
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("You need to log in first.");
        router.push("/auth-login");
        return;
      }

      try {
        const response = await fetch(
          "https://event-login-883aa-default-rtdb.firebaseio.com/login.json"
        );
        const data = await response.json();
        const users = Object.values(data);
        const user = users.find((user) => user.token === token);

        if (user) {
          setUserData(user);
        } else {
          toast.error("User not found. Please log in again.");
          router.push("/auth-login");
        }
      } catch (error) {
        toast.error("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, [router]);

  const showSection = (section) => {
    setActiveSection(section);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="pt-[3.8%] h-screen flex items-center justify-center">
      <div className="w-[70%] mx-auto">
        <div className="flex flex-wrap">
          {/* Sidebar */}
          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-white shadow-md rounded-lg p-6">
              <div className="flex flex-col items-center text-center">
                <img
                  src={userData?.image ||"https://img.icons8.com/?size=100&id=15265&format=png&color=00000033"}
                  alt="Admin"
                  className="rounded-full w-32 h-32 p-1 border border-gray-300"
                  width={800}
                  height={800}
                />
                <div className="mt-3">
                  <h4 className="text-lg py-1 font-semibold">
                    {userData.email}
                  </h4>
                  <p className="text-gray-600 py-1">+91 7493658737</p>
                  <p className="text-gray-500 py-1">Delhi, NCR</p>
                </div>
              </div>
              <div
                className="mt-4 btn text-center cursor-pointer text-red-600 font-semibold"
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  router.push("/auth-login");
                }}
              >
                Logout
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-2/3 px-4">
            {/* Profile Details Section */}
            {activeSection === "profileDetails" && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h5 className="text-xl font-semibold mb-4">
                  Profile Information
                </h5>
                <p className="py-2">
                  <strong>Email Address:</strong> {userData.email}
                </p>
                <p className="py-2">
                  <strong>Contact:</strong> +91 7493658737
                </p>
                <p className="py-2">
                  <strong>City:</strong> Delhi, NCR
                </p>
              </div>
            )}

            {/* Orders Section */}
            {activeSection === "orderDetails" && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h5 className="text-xl font-semibold mb-4">Orders</h5>
                <p>No orders found.</p>
              </div>
            )}

            {/* Address Book Section */}
            {activeSection === "addressBook" && (
              <div className="bg-white shadow-md rounded-lg p-6">
                <h5 className="text-xl font-semibold mb-4">Address Book</h5>
                <button
                  className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                  onClick={() => showSection("addAddress")}
                >
                  Add Address
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
