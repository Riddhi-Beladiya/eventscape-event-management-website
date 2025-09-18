// import React from 'react'

// const page = () => {
//   return (
  //   <div className="relative">
  //   <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  //   <div className="relative bg-[url('https://img.freepik.com/free-photo/close-up-person-working-call-center_23-2149288225.jpg')] bg-cover bg-center h-[40vh] flex items-center justify-center">
  //     <h1 className="text-4xl md:text-5xl font-bold text-white text-center shadow-lg">
  //       Support Center
  //     </h1>
  //   </div>
  // </div>
//   )
// }

// export default page

"use client";

import React from "react";
import { CalendarCheck, Ticket, MapPin, Mail, MessageCircle, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <div className="overflow-auto min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative bg-[url('https://img.freepik.com/free-photo/close-up-person-working-call-center_23-2149288225.jpg')] bg-cover bg-center h-[40vh] flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center shadow-lg">
            Event service Center
          </h1>
        </div>
      </div>

      {/* Event Services */}
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">How Can We Help?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Event Planning Support */}
          <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg cursor-pointer">
            <CalendarCheck size={40} className="text-blue-600" />
            <h3 className="mt-4 font-semibold text-lg">Event Planning</h3>
            <p className="text-gray-600">Need help organizing your event? We’re here to assist.</p>
          </div>

          {/* Ticketing Support */}
          <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg cursor-pointer">
            <Ticket size={40} className="text-green-600" />
            <h3 className="mt-4 font-semibold text-lg">Ticketing Issues</h3>
            <p className="text-gray-600">Facing ticket purchase issues? Contact our support team.</p>
          </div>

          {/* Venue Assistance */}
          <div className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg cursor-pointer">
            <MapPin size={40} className="text-red-600" />
            <h3 className="mt-4 font-semibold text-lg">Venue Assistance</h3>
            <p className="text-gray-600">Get help with event locations and setup.</p>
          </div>
        </div>
      </div>

      {/* Support Options */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">Need Immediate Help?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* FAQs */}
          <button
            onClick={() => router.push("/faqs")}
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg cursor-pointer"
          >
            <HelpCircle size={40} className="text-blue-600" />
            <h3 className="mt-4 font-semibold text-lg">FAQs</h3>
            <p className="text-gray-600">Get answers to common event queries.</p>
          </button>

          {/* Live Chat */}
          <button
            onClick={() => window.open("https://wa.me/1234567890", "_blank")}
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg cursor-pointer"
          >
            <MessageCircle size={40} className="text-green-600" />
            <h3 className="mt-4 font-semibold text-lg">Live Chat</h3>
            <p className="text-gray-600">Chat with our support team on WhatsApp.</p>
          </button>

          {/* Email Support */}
          <button
            onClick={() => (window.location.href = "mailto:support@eventscape.com")}
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg cursor-pointer"
          >
            <Mail size={40} className="text-red-600" />
            <h3 className="mt-4 font-semibold text-lg">Email Support</h3>
            <p className="text-gray-600">Send us an email for event assistance.</p>
          </button>
        </div>
      </div>

      {/* Event Support Request Form */}
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md m-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Request Event Support</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md" required />
          <select className="w-full p-3 border rounded-md" required>
            <option value="">Select Support Type</option>
            <option value="event-planning">Event Planning Assistance</option>
            <option value="ticket-issue">Ticketing Issue</option>
            <option value="venue-help">Venue Assistance</option>
          </select>
          <textarea placeholder="Describe Your Issue" className="w-full p-3 border rounded-md" rows="4" required></textarea>
          <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
