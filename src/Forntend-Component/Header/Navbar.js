  "use client";
  import Link from "next/link";
  import { useState, useRef, useEffect } from "react";
  import { IoMdMenu } from "react-icons/io";
  import { usePathname, useRouter } from "next/navigation";
  import Image from "next/image";
  import { AiOutlineLogout } from "react-icons/ai";

  const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const pathname = usePathname();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [userData, setUserData] = useState(null);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Close menu when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch user data from Firebase
    useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
          const response = await fetch(
            "https://event-login-883aa-default-rtdb.firebaseio.com/login.json"
          );
          const data = await response.json();
          const users = Object.values(data);
          const user = users.find((user) => user.token === token);

          if (user) setUserData(user);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      };

      fetchUserData();
    }, []);

    const handleProfileClick = () => {
      if (!userData) {
        router.push("/auth-login");
        return;
      }
      router.push(userData.age >= 24 ? "/admin-dashboard" : "/profile");
    };

    const handleDashboard = () => {
      if (!userData) {
        router.push("/auth-login");
        return;
      }
      router.push(userData.age >= 24 ? "/admin-dashboard" : "/dashboard");
    };

     const handleLogout = () => {
      localStorage.removeItem("accessToken");
      router.push("/home");
      setUserData(null);
      
    };
    
    
    

    return (
      <nav className="bg-white fixed z-50 w-full border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="max-w-screen-3xl flex items-center justify-between mx-auto px-4 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="space-x-3 hidden md:block rtl:space-x-reverse"
          >
            <Image
              src="/Images/Logo1.png"
              alt="Logo"
              width={100}
              height={100}
              className="w-full"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition"
            aria-expanded={isOpen}
          >
            <IoMdMenu className="text-2xl" />
          </button>
          
          {isOpen && (
          <div
            ref={menuRef}
            className="fixed  top-0 left-0 w-full h-full flex  md:hidden"
          >
            <div className="bg-white   w-[40%] h-screen overflow-auto p-2 shadow-lg">
             <div className="flex p-1 justify-between">

             <Link href="/" className=" h-14">
                <Image
                  src="/Images/Logo1.png"
                  alt="Logo"
                  width={100}
                  height={100}
                  className=" w-full h-14"
                />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className=" text-gray-600 right-0 text-lg"
              >
                ✖
              </button>
              </div>
              <ul className="flex flex-col pt-4  space-y-1 w-full text-sm text-center ">
                {[
                  { name: "Home", path: "/" },
                  { name: "Booking", path: "/events" },
                  { name: "Shop", path: "/shop" },
                  { name: "About", path: "/about" },
                  { name: "Portfolio", path: "/portfolio" },
                  { name: "Contact", path: "/contact" },
                ].map((item) => (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      className={`block py-2 px-3 rounded-md ${
                        pathname === item.path
                          ? "text-white bg-blue-700 "
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}          

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <ul className="flex space-x-8">
              {[
                { name: "Home", path: "/" },
                { name: "Booking", path: "/events" },
                { name: "Shop", path: "/shop" },
                { name: "About", path: "/about" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`block py-2 px-3 rounded-md ${
                      pathname === item.path
                        ? "text-white bg-blue-700"
                        : "text-gray-300 hover:text-blue-700"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* User Avatar or Login Button */}
          <div className="relative" ref={dropdownRef}>
            {userData ? (
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="text-white w-12 h-12 rounded-full flex items-center justify-center relative cursor-pointer"
              >
                <div className="absolute inset-0 border-2 border-dashed border-white rounded-full animate-spin-slow"></div>
                <Image
                  src={
                    userData.image ||
                    "https://img.icons8.com/?size=100&id=15265&format=png&color=FFFFFF"
                  }
                  alt="User"
                  className="h-10 w-10 rounded-full object-cover"
                  width={48}
                  height={48}
                />
              </div>
            ) : (
              <Link href="/auth-login">
                <button className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
                  Login
                </button>
              </Link>
            )}

            {/* Dropdown Menu */}
            {dropdownOpen && userData && (
              <div className="absolute right-0 mt-2 z-50 w-48 bg-white shadow-lg rounded-lg p-2">
                <div className="text-gray-700">
                  <p
                    onClick={handleDashboard}
                    className="px-3 py-3 hover:bg-blue-700 cursor-pointer hover:text-white rounded-lg"
                  >
                    {userData.age >= 24 ? "Admin Dashboard" : "Dashboard"}
                  </p>
                  <p
                    onClick={handleProfileClick}
                    className="px-3 py-3 hover:bg-blue-700 cursor-pointer hover:text-white rounded-lg"
                  >
                    My Profile
                  </p>

                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 p-3 py-3 hover:bg-red-500 text-black rounded w-full"
                  >
                    <AiOutlineLogout className="text-2xl" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    );
  };

  export default Header;





// "use client";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { IoMdMenu } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";

// const Header = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const menuRef = useRef(null);
//   const pathname = usePathname();
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const [userData, setUserData] = useState(null);
//   const dropdownRef = useRef(null);
//   const router = useRouter();

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem("accessToken");
//       if (!token) return;

//       try {
//         const response = await fetch(
//           "https://event-login-883aa-default-rtdb.firebaseio.com/login.json"
//         );
//         const data = await response.json();
//         const users = Object.values(data);
//         const user = users.find((user) => user.token === token);

//         if (user) setUserData(user);
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleProfileClick = () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       router.push("/auth-login");
//       return;
//     }
//     router.push(userData?.age >= 24 ? "/admin-dashboard" : "/profile");
//   };

//   const handleDashboard = () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) {
//       router.push("/auth-login");
//       return;
//     }
//     router.push(userData?.age >= 24 ? "/admin-dashboard" : "/dashboard");
//   };

//   return (
//     <nav className="bg-white fixed z-50 w-full border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//       <div className="max-w-screen-3xl flex items-center justify-between mx-auto px-4 py-3">
//         {/* Logo */}
//         <Link
//           href="/"
//           className=" space-x-3 hidden  md:block rtl:space-x-reverse"
//         >
//           <Image
//             src="/Images/Logo1.png"
//             alt="Logo"
//             width={100}
//             height={100}
//             className="w-full"
//           />
//         </Link>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 transition"
//           aria-expanded={isOpen}
//         >
//           <IoMdMenu className="text-2xl" />
//         </button>

//         {/* Mobile Menu Popup */}
        // {isOpen && (
        //   <div
        //     ref={menuRef}
        //     className="fixed  top-0 left-0 w-full h-full flex  md:hidden"
        //   >
        //     <div className="bg-white   w-[40%] h-screen overflow-auto p-2 shadow-lg">
        //      <div className="flex p-1 justify-between">

        //      <Link href="/" className=" h-14">
        //         <Image
        //           src="/Images/Logo1.png"
        //           alt="Logo"
        //           width={100}
        //           height={100}
        //           className=" w-full h-14"
        //         />
        //       </Link>
        //       <button
        //         onClick={() => setIsOpen(false)}
        //         className=" text-gray-600 right-0 text-lg"
        //       >
        //         ✖
        //       </button>
        //       </div>
        //       <ul className="flex flex-col pt-4  space-y-1 w-full text-sm text-center ">
        //         {[
        //           { name: "Home", path: "/" },
        //           { name: "Booking", path: "/events" },
        //           { name: "Shop", path: "/shop" },
        //           { name: "About", path: "/about" },
        //           { name: "Portfolio", path: "/portfolio" },
        //           { name: "Contact", path: "/contact" },
        //         ].map((item) => (
        //           <li key={item.path}>
        //             <Link
        //               href={item.path}
        //               className={`block py-2 px-3 rounded-md ${
        //                 pathname === item.path
        //                   ? "text-white bg-blue-700 "
        //                   : "text-gray-700 hover:bg-gray-100"
        //               }`}
        //               onClick={() => setIsOpen(false)}
        //             >
        //               {item.name}
        //             </Link>
        //           </li>
        //         ))}
        //       </ul>
        //     </div>
        //   </div>
        // )}

//         {/* Desktop Navigation */}
//         <div className="hidden md:flex md:items-center">
//           <ul className="flex space-x-8 ">
//             {[
//               { name: "Home", path: "/" },
//               { name: "Booking", path: "/events" },
//               { name: "Shop", path: "/shop" },
//               { name: "About", path: "/about" },
//               { name: "Portfolio", path: "/portfolio" },
//               { name: "Contact", path: "/contact" },
//             ].map((item) => (
//               <li key={item.path}>
//                 <Link
//                   href={item.path}
//                   className={`block py-2 px-3 rounded-md ${
//                     pathname === item.path
//                       ? "text-white bg-blue-700"
//                       : "text-gray-300  hover:text-blue-700"
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//         <div className="relative" ref={dropdownRef}>
//           <div
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             className="text-white w-12 h-12 rounded-full flex items-center justify-center relative cursor-pointer"
//           >
//             <div className="absolute inset-0 border-2 border-dashed border-white rounded-full animate-spin-slow"></div>
//             <Image
//               src={
//                 userData?.image ||
//                 "https://img.icons8.com/?size=100&id=15265&format=png&color=FFFFFF"
//               }
//               alt="User"
//               className="h-10 w-10 rounded-full object-cover"
//               width={48}
//               height={48}
//             />
//           </div>

//           {/* Dropdown Menu */}
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 z-50 w-48 bg-white shadow-lg rounded-lg p-2">
//               <div className="text-gray-700">
//                 <p
//                   onClick={handleDashboard}
//                   className="px-3 py-3 hover:bg-blue-700 cursor-pointer hover:text-white rounded-lg"
//                 >
//                   {userData?.age >= 24 ? "Admin Dashboard" : "Dashboard"}
//                 </p>
//                 <p
//                   onClick={handleProfileClick}
//                   className="px-3 py-3 hover:bg-blue-700 cursor-pointer hover:text-white rounded-lg"
//                 >
//                   My Profile
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;





// "use client";
// import Link from "next/link";
// import { useState, useRef, useEffect } from "react";
// import { IoMdMenu } from "react-icons/io";
// import { usePathname, useRouter } from "next/navigation";
// import Image from "next/image";

// const Header = () => {
// const [isOpen, setIsOpen] = useState(false);
// const [userData, setUserData] = useState(null);
// const [dropdownOpen, setDropdownOpen] = useState(false);
// const dropdownRef = useRef(null);
// const router = useRouter();
// const pathname = usePathname(); // ✅ Get current page path

// useEffect(() => {
//   const fetchUserData = async () => {
//     const token = localStorage.getItem("accessToken");
//     if (!token) return;

//     try {
//       const response = await fetch(
//         "https://event-login-883aa-default-rtdb.firebaseio.com/login.json"
//       );
//       const data = await response.json();
//       const users = Object.values(data);
//       const user = users.find((user) => user.token === token);

//       if (user) setUserData(user);
//     } catch (error) {
//       console.error("Failed to fetch user data:", error);
//     }
//   };

//   fetchUserData();
// }, []);

// // Close dropdown when clicking outside
// useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownOpen(false);
//     }
//   };
//   document.addEventListener("mousedown", handleClickOutside);
//   return () => {
//     document.removeEventListener("mousedown", handleClickOutside);
//   };
// }, []);

// const handleProfileClick = () => {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     router.push("/auth-login");
//     return;
//   }
//   router.push(userData?.age >= 24 ? "/admin-dashboard" : "/profile");
// };

// const handleDashboard = () => {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     router.push("/auth-login");
//     return;
//   }
//   router.push(userData?.age >= 24 ? "/admin-dashboard" : "/dashboard");
// };

//   return (
//     <nav className="bg-white fixed z-50 w-full border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//       <div className="max-w-screen-3xl flex  items-center mx-auto justify-between px-4">
//         <Link href="/" className="flex space-x-3 rtl:space-x-reverse">
//           <Image
//             src="/Images/Logo1.png"
//             alt="Logo"
//             width={100}
//             height={100}
//             className="w-full"
//           />
//         </Link>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="inline-flex items-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden hover:bg-gray-100"
//           aria-expanded={isOpen}
//         >
//           <IoMdMenu />
//         </button>

//         {/* Navigation Menu */}
//         <div
//           className={`w-full md:block md:w-auto transition-all duration-300 ${
//             isOpen ? "block " : "hidden"
//           }`}
//           id="navbar-dropdown"
//         >
//           <ul className="flex flex-col font-medium p-4 bg-white  md:bg-transparent md:p-0 mt-4 border rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0  ">
//             {[
//               { name: "Home", path: "/" },
//               { name: "Booking", path: "/events" },
//               { name: "Shop", path: "/shop" },
//               { name: "About", path: "/about" },
//               { name: "Portfolio", path: "/portfolio" },
//               { name: "Contact", path: "/contact" },
//             ].map((item) => (
//               <li key={item.path} >
//                 <Link
//                   href={item.path}
//                   className={`block py-2 px-3 rounded-sm ${
//                     pathname === item.path
//                       ? "text-white bg-blue-700"
//                       : "md:text-gray-300 text-gray-700 hover:bg-gray-100 md:hover:text-blue-700"
//                   }`}
//                   onClick={() => setIsOpen(false)} // Close menu on click
//                 >
//                   {item.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>

{
  /* User Dropdown */
}
// <div className="relative" ref={dropdownRef}>
//   <div
//     onClick={() => setDropdownOpen(!dropdownOpen)}
//     className="text-white w-12 h-12 rounded-full flex items-center justify-center relative cursor-pointer"
//   >
//     <div className="absolute inset-0 border-2 border-dashed border-white rounded-full animate-spin-slow"></div>
//     <Image
//       src={
//         userData?.image ||
//         "https://img.icons8.com/?size=100&id=15265&format=png&color=FFFFFF"
//       }
//       alt="User"
//       className="h-10 w-10 rounded-full object-cover"
//       width={48}
//       height={48}
//     />
//   </div>

//   {/* Dropdown Menu */}
//   {dropdownOpen && (
//     <div className="absolute right-0 mt-2 z-50 w-48 bg-white shadow-lg rounded-lg p-2">
//       <div className="text-gray-700">
//         <p
//           onClick={handleDashboard}
//           className="px-3 py-3 hover:bg-blue-700 cursor-pointer hover:text-white rounded-lg"
//         >
//           {userData?.age >= 24 ? "Admin Dashboard" : "Dashboard"}
//         </p>
//         <p
//           onClick={handleProfileClick}
//           className="px-3 py-3 hover:bg-blue-700 cursor-pointer hover:text-white rounded-lg"
//         >
//           My Profile
//         </p>
//       </div>
//     </div>
//   )}
// </div>
// </div>
//     </nav>
//   );
// };

// export default Header;
