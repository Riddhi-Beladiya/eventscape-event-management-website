"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";
import html2canvas from "html2canvas";
import { format } from "date-fns";
import jsPDF from "jspdf";
import BookingModal from "./BookingModal";
import { FaEye, FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [bookingToRemove, setBookingToRemove] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth-login");
        return;
      }

      try {
        const response = await fetch(
          "https://event-login-883aa-default-rtdb.firebaseio.com/login.json"
        );
        const data = await response.json();
        const users = Object.entries(data);
        const userEntry = users.find(([key, user]) => user.token === token);

        if (userEntry) {
          const [userId, user] = userEntry;
          setUserData({ ...user, id: userId });
          setBookings(user.bookings || []);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(storedBookings);
  }, []);

  const downloadTicket = async (booking) => {
    const element = document.createElement("div");
    element.innerHTML = `
<div class="flex w-[80%] m-20 mx-auto shadow-lg border border-gray-300 rounded-lg overflow-hidden bg-cover bg-center"
  style="background-image: url('https://t3.ftcdn.net/jpg/05/22/90/58/360_F_522905862_C0nQ02alU5owCKNJXu138NMes2tYuZ7S.jpg');">
  
  <div class="w-[80%] border-l-2 p-4 flex flex-col bg-white bg-opacity-80 backdrop-blur-md">
    <!-- Event Name and Ticket Type -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold uppercase">
        ${booking.eventName || "#SaveWarriorNun"}
      </h1>
      <h2 class="text-sm text-gray-700">
        ${booking.ticketType || "General Admission"}
      </h2>
    </div>

    <!-- Event Date -->
    <div class="mt-2 flex items-center">
      <p class="text-sm text-gray-600 uppercase">
        <span class="font-semibold mx-2">
          ${
            booking.eventDateStart
              ? `${format(
                  new Date(booking.eventDateStart),
                  "MMMM dd, yyyy"
                )} <span>at</span> ${format(
                  new Date(booking.eventDateStart),
                  "hh:mm a"
                )}`
              : "Date Unavailable"
          }
        </span>
      </p>
    </div>

    <!-- Additional Info and Tagline -->
    <div class="mt-2">
      <h2 class="text-sm text-gray-700">
        ${booking.additionalInfo || "Halo Bearers"}
      </h2>
      <p class="text-sm italic text-gray-500">
        ${booking.tagline || "IN THIS LIFE OR THE NEXT"}
      </p>
    </div>

    <!-- Event Location -->
    <p class="mt-2 text-sm font-semibold text-gray-800 flex items-center">
      <span>${booking.eventLocation || "Not Venue"}</span>
    </p>

    <!-- QR Code and Price -->
    <div class="mt-6 flex items-center justify-between">
      <img class="w-24 h-24" src="https://i.imgur.com/HMAAsVO.png" alt="QR code">
      <p class="text-sm font-bold text-gray-800">
        #${booking.totalPrice}
      </p>
    </div>
  </div>
</div>


    `;

    document.body.appendChild(element);
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 10, 10, 200, 60); // Adjust dimensions as needed
    pdf.save(`ticket_${booking.eventName}.pdf`); // Use event name instead of event ID
    document.body.removeChild(element);
  };

  const viewTicket = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const confirmRemoveBooking = (bookingId) => {
    setBookingToRemove(bookingId);
    setIsConfirmOpen(true);
  };

  const removeBooking = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/auth-login");
      return;
    }

    try {
      const response = await fetch(
        "https://event-login-883aa-default-rtdb.firebaseio.com/login.json"
      );
      const data = await response.json();
      const users = Object.entries(data);
      const userEntry = users.find(([key, user]) => user.token === token);

      if (userEntry) {
        const [userId, user] = userEntry;

        // Ensure bookings exist before filtering
        const updatedBookings = user.bookings
          ? user.bookings.filter(
              (booking) => booking.eventId !== bookingToRemove
            )
          : [];

        const updatedUser = {
          ...user,
          bookings: updatedBookings,
        };

        await fetch(
          `https://event-login-883aa-default-rtdb.firebaseio.com/login/${userId}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );

        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
        setIsConfirmOpen(false);
      }
    } catch (error) {
      console.error("Failed to remove booking:", error);
    }
  };

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
          <p className="text-center mt-2 text-lg font-medium">
            Loading booking details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {isModalOpen && (
        <BookingModal
          setIsModalOpen={setIsModalOpen}
          event={selectedBooking.eventName}
          date={selectedBooking.eventDateStart}
          seat={selectedBooking.ticketType}
          image={selectedBooking.eventImage}
          totalPrice={selectedBooking.totalPrice}
        />
      )}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold">Confirm Removal</h3>
            <p>Are you sure you want to remove this booking?</p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={removeBooking}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className=" pt-32 w-[80%] min-h-screen mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
          Your Bookings
        </h1>

        <div className="overflow-x-auto w-full">
          <table className="w-full bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-blue-900 text-white">
              <tr className="text-center">
                <th className="py-3 px-4">Event Id</th>
                <th className="py-3 px-4">Event Image</th>
                <th className="py-3 px-4">Event Name</th>
                <th className="py-3 px-4">Ticket Type</th>
                <th className="py-3 px-4">Quantity</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">User Email</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="py-4 px-6 text-center text-gray-600 font-semibold"
                  >
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-100 transition text-center"
                  >
                    <td className="py-3 px-4">{booking.eventId}</td>
                    <td className="py-3 px-4">
                      {booking.eventImage ? (
                        <img
                          src={booking.eventImage}
                          alt="Event"
                          className="w-16 h-16 object-cover rounded mx-auto"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded mx-auto">
                          <span className="text-gray-500 text-sm">
                            No Image
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">{booking.eventName}</td>
                    <td className="py-3 px-4">{booking.ticketType}</td>
                    <td className="py-3 px-4">{booking.quantity}</td>
                    <td className="py-3 px-4 font-semibold">
                      ${booking.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-gray-500">{booking.email}</td>
                    <td className="py-3 px-4 flex justify-center items-center gap-4 h-[88px]">
                      <button
                        onClick={() => downloadTicket(booking)}
                        className="text-green-600 hover:text-green-700 transition"
                      >
                        <FaDownload className="text-2xl" />
                      </button>
                      <button
                        onClick={() => viewTicket(booking)}
                        className="text-blue-600 hover:text-blue-700 transition"
                      >
                        <FaEye className="text-2xl" />
                      </button>
                      <button
                        onClick={() => confirmRemoveBooking(booking.eventId)}
                        className="text-red-600 hover:text-red-700 transition"
                      >
                        <MdDelete className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
