"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Oval } from "react-loader-spinner";
import { fetchEvents } from "@/app/api/Eventapi";
import Image from "next/image";

const TicketBookingPage = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ticketType, setTicketType] = useState("Standard");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(99);
  const [taxes, setTaxes] = useState(0.1); // 10% tax
  const [totalPrice, setTotalPrice] = useState(price * quantity * (1 + taxes));
  const [eventName, setEventName] = useState(""); 
  const [eventImage, setEventImage] = useState(""); 
  const [eventDateStart, setEventDateStart] = useState(""); 
  const [eventDescription, setEventDescription] = useState(""); 
  const [eventLocation, setEventLocation] = useState(""); 
  const [eventOrganizer, setEventOrganizer] = useState(""); 
  const [eventCategory, setEventCategory] = useState(""); 
  const [eventType, setEventType] = useState(""); 
  const [eventEndDate, setEventEndDate] = useState(""); 
  const [eventSeat, setEventSeat] = useState(""); 
  const [eventId, setEventId] = useState(""); 
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventIdParam = searchParams.get("id");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const events = await fetchEvents();
        const event = events.find((ev) => ev.id === eventIdParam);
        if (event) {
          setEventId(event.id);
          setEventName(event.title);
          setEventImage(event.image); 
          setEventDateStart(event.start); 
          setEventDescription(event.description); 
          setEventLocation(event.location); 
          setEventOrganizer(event.organizer);
          setEventCategory(event.category); 
          setEventType(event.type); 
          setEventEndDate(event.end); 
          setEventSeat(event.seat); 
          setPrice(ticketType === "VIP" ? event.price * 5 : event.price);
        }
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    if (eventIdParam) {
      fetchEventData();
    }
  }, [eventIdParam, ticketType]);

  useEffect(() => {
    setTotalPrice(quantity * price * (1 + taxes));
  }, [quantity, price, taxes]);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const booking = {
      eventId,
      eventName,
      eventImage,
      eventDateStart,
      ticketType,
      quantity,
      eventLocation,
      totalPrice,
      email,
    };

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
        const updatedUser = {
          ...user,
          bookings: [...(user.bookings || []), booking],
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

        const storedBookings =
          JSON.parse(localStorage.getItem("bookings")) || [];
        storedBookings.push(booking);
        localStorage.setItem("bookings", JSON.stringify(storedBookings));

        setLoading(false);
        alert("Ticket booked successfully!");
        router.push(`/booking-ticket`);
      } else {
        setLoading(false);
        alert("Failed to book ticket.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to book ticket:", error);
      alert("Failed to book ticket.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-32 p-4">
    {/* Loading Overlay */}
    {loading && (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className="flex flex-col items-center">
          <Oval
            visible={true}
            height={80}
            width={40}
            color="#08318a"
            secondaryColor="#749ffc"
            ariaLabel="loading"
          />
          <p className="text-blue-900 text-lg mt-2">Processing your booking...</p>
        </div>
      </div>
    )}

    {/* Booking Form Container */}
    <div className="w-full max-w-sm sm:max-w-lg bg-white shadow-lg rounded-lg p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800">
        {eventName}
      </h1>

      {/* Event Image */}
      <div className="flex justify-center mb-4 sm:mb-6">
        {eventImage ? (
          <Image
            src={eventImage}
            alt="Event"
            className="w-full max-h-64 object-cover rounded-lg"
            width={300}
            height={200}
          />
        ) : (
          <div className="w-full h-32 sm:h-40 bg-gray-200 flex items-center justify-center rounded-lg">
            <span className="text-gray-500">No Image Available</span>
          </div>
        )}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleBooking} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block py-1 text-gray-700 font-medium">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block py-1 text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block p-1 text-gray-700 font-medium">Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ticket Type */}
        <div>
          <label className="block py-1 text-gray-700 font-medium">Ticket Type:</label>
          <select
            value={ticketType}
            onChange={(e) => setTicketType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Standard">Standard</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        {/* Quantity */}
        <div>
          <label className="block py-1 text-gray-700 font-medium">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
            className="w-full min-w-0 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Total Price */}
        <div>
          <label className="block py-1 text-gray-700 font-medium">Total Price:</label>
          <input
            type="text"
            value={`$${totalPrice.toFixed(2)}`}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        {/* Taxes */}
        <div>
          <label className="block py-1 text-gray-700 font-medium">Taxes:</label>
          <input
            type="text"
            value={`$${(totalPrice * taxes).toFixed(2)}`}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="btn w-full"
          >
            Book Ticket
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default TicketBookingPage;
