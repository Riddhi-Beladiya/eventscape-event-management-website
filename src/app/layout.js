"use client"; // it's a client component

import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/Forntend-Component/Header/Navbar";
import AdminHeader from "@/Backend-Component/AdminHeader";
import Footer from "@/Forntend-Component/Footer/Footer";
import ReduxProvider from "@/Forntend-Component/ReduxProvider";
import { getLastLoginTime, isAuthenticated, logout, setLastLoginTime } from "./api/Login";
import { Oval } from "react-loader-spinner";

export default function RootLayout({ children }) {
  const allowedRoutes = [
    "/",
    "/home",
    "/events",
    "/about",
    "/request-organizer",
    "/create-your-event",
    "/shop",
    "/event-details",
    "/payment",
    "/add-cart",
    "/contact",
    "/portfolio",
    "/profile",
    "/ticket-booking",
    "/booking-ticket",
    "/news",
    "/careers",
    "/privacy",
    "/terms",
    "/support",
    "/faqs",
    "/servicecenter",
    "/security",
  ];

  const excludedPaths = [
    "/dashboard",
    "/add-events",
    "/user-book-ticket",
    "/add-guest",
    "/schedules",
    "/add-event-accessories",
    "/edit-profile",
    "/order-event-accessories",
    "/clientmessage"
  ];

  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [shouldRenderAdminDashboard, setShouldRenderAdminDashboard] = useState(false);
  const [shouldRenderSpecialHeader, setShouldRenderSpecialHeader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    setShouldRenderAdminDashboard(excludedPaths.includes(pathname));
    setShouldRenderSpecialHeader(allowedRoutes.includes(pathname));
  }, [pathname]);

  if (loading) {
    return (
      <html lang="en">
        <body>
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
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <title>Eventscape</title>
      <body>
        <ReduxProvider>
          {shouldRenderSpecialHeader && <Header />}
          {shouldRenderAdminDashboard ? <AdminHeader>{children}</AdminHeader> : children}
          {shouldRenderSpecialHeader && <Footer />}
        </ReduxProvider>
      </body>
    </html>
  );
}
