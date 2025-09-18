
"use client";
import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

const USER_API_URL =
  "https://event-login-883aa-default-rtdb.firebaseio.com/login.json";

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(USER_API_URL);
        if (!response.ok) throw new Error("Failed to fetch user data");

        const result = await response.json();

        if (!result) {
          setData([]);
          return;
        }

        // ✅ Extract and flatten all bookings
        const bookingsArray = Object.entries(result).flatMap(([userId, userData]) => {
          if (!userData.bookings) return []; // ✅ Ensure 'bookings' exists

          return userData.bookings.map((booking) => ({
            ...booking,
            email: userData.email || "Unknown Email", // Ensure email exists
          }));
        });

        setData(bookingsArray);
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

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">User Bookings</h1>      

      {data.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200 text-center">
              <tr>
                {[
                  "Email",
                  "Event Name",
                  "Event Date",
                  "Location",
                  "Ticket Type",
                  "Quantity",
                  "Total Price",
                  "Event Image",
                ].map((heading) => (
                  <th key={heading} className="py-3 px-6 border-b text-gray-700 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-100 transition text-center">
                  <td className="py-3 px-6 border-b text-gray-600">{booking.email}</td>
                  <td className="py-3 px-6 border-b text-gray-600">{booking.eventName || "N/A"}</td>
                  <td className="py-3 px-6 border-b text-gray-600">
                    {booking.eventDateStart ? new Date(booking.eventDateStart).toLocaleString() : "N/A"}
                  </td>
                  <td className="py-3 px-6 border-b text-gray-600">{booking.eventLocation || "N/A"}</td>
                  <td className="py-3 px-6 border-b text-gray-600">{booking.ticketType || "N/A"}</td>
                  <td className="py-3 px-6 border-b text-gray-600">{booking.quantity || 0}</td>
                  <td className="py-3 px-6 border-b text-gray-600">${booking.totalPrice ? booking.totalPrice.toFixed(2) : "0.00"}</td>
                  <td className="py-3 px-6 border-b text-gray-600">
                    {booking.eventImage ? (
                      <img src={booking.eventImage} alt={booking.eventName} className="w-16 h-16 object-cover rounded" />
                    ) : (
                      <span className="text-gray-500">No Image</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">No bookings found...</p>
      )}
    </div>
  );
};

export default Page;
