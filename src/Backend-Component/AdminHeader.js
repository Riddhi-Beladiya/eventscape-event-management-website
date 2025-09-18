"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  FaHouse,
  FaCalendar,
  FaBell,
  FaGear,
  FaAngleLeft,
  FaEllipsisVertical,
} from "react-icons/fa6";
import { BsCartCheckFill } from "react-icons/bs";
import "./AdminHeader.css";
import { MdOutlineEventRepeat } from "react-icons/md";
import { IoTicketOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa6";
//import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import { AiOutlineLogout } from "react-icons/ai";
import { MdContactMail } from "react-icons/md";

const AdminHeader = ({ children }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current route

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.push("/home");
  };

  return (
    <div className="flex w-full h-screen fixed">
      <aside
        className={`sidebar pb-5 transition-all ${
          isMinimized ? "w-20" : "w-64"
        } flex flex-col`}
      >
        <div className="header">
          <Link
            href="/"
            className="flex items-center space-x-2 hover:bg-gray-200 hover:text-black rounded w-full"
          >
            {!isMinimized && <span className="unfocus">HOME</span>}
          </Link>
          <button className="text-white md:hidden">
            <FaEllipsisVertical />
          </button>
        </div>

        <div className="separator-wrapper">
          <hr className="separator" />
          <button onClick={toggleMinimize} className="minimize-btn">
            <FaAngleLeft
              className={`transition-transform ${
                isMinimized ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="navigation flex-1 overflow-y-auto">
          <div className="section p-4">
            <ul className="items">
              <NavItem
                href="/dashboard"
                icon={<FaHouse className="text-2xl" />}
                text="Dashboard"
                isMinimized={isMinimized}
                isActive={pathname === "/dashboard"}
              />
              <NavItem
                href="/add-events"
                icon={<MdOutlineEventRepeat className="text-2xl" />}
                text="Add Events"
                isMinimized={isMinimized}
                isActive={pathname === "/add-events"}
              />
              <NavItem
                href="/user-book-ticket"
                icon={<IoTicketOutline className="text-2xl" />}
                text="UserBook ticket"
                isMinimized={isMinimized}
                isActive={pathname === "/user-book-ticket"}
              />
              <NavItem
                href="/add-guest"
                icon={<FaRegAddressCard className="text-2xl" />}
                text="Add Guest"
                isMinimized={isMinimized}
                isActive={pathname === "/add-guest"}
              />
              <NavItem
                href="/add-event-accessories"
                icon={<FaCalendar className="text-2xl" />}
                text="Event Accessories"
                isMinimized={isMinimized}
                isActive={pathname === "/add-event-accessories"}
              />
              <NavItem
                href="/order-event-accessories"
                icon={<BsCartCheckFill className="text-2xl" />}
                text="Order Accessories"
                isMinimized={isMinimized}
                isActive={pathname === "/order-event-accessories"}
              />
              <NavItem
                href="/edit-profile"
                icon={<FaBell className="text-2xl" />}
                text="Edit Profile"
                isMinimized={isMinimized}
                isActive={pathname === "/edit-profile"}
              />
              <NavItem
                href="/clientmessage"
                icon={<MdContactMail className="text-2xl" />}
                text="Client Message"
                isMinimized={isMinimized}
                isActive={pathname === "/clientmessage"}
              />
              
            </ul>
          </div>
        </nav>
        <li className="item p-4">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 py-3 hover:bg-red-500 text-white rounded w-full"
          >
            <AiOutlineLogout className="text-2xl" />
            {!isMinimized && <span className="item-text">Logout</span>}
          </button>
        </li>
      </aside>
      <main className="p-4 flex-1 overflow-auto w-full">{children}</main>
    </div>
  );
};

export default AdminHeader;

const NavItem = ({ href, icon, text, isMinimized, isActive }) => (
  <li className="item">
    <Link
      href={href}
      className={`flex items-center space-x-3 p-3 py-3 rounded ${
        isActive
          ? "bg-blue-600 text-white"
          : "hover:bg-gray-200 hover:text-[#111827] text-white"
      }`}
    >
      <span>{icon}</span>
      {!isMinimized && <span className="item-text">{text}</span>}
    </Link>
  </li>
);
