// import React from 'react'

// export default function page (){
//   return (
//     <div className="overflow-auto min-h-screen bg-gray-100">
//         <div className="relative">
//         <div className="absolute inset-0 bg-black bg-opacity-50"></div>
//         <div
//           className="relative bg-[url('https://www.shutterstock.com/image-photo/headset-customer-support-equipment-call-600nw-2103056624.jpg')] bg-cover bg-center h-[40vh] flex items-center justify-center"
//         >
//           <h1 className="text-4xl md:text-5xl font-bold text-black text-center shadow-lg">
//             Support Center
//           </h1>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client";

import React from "react";
import { Mail, MessageCircle, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <div className="overflow-auto min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative bg-[url('https://www.shutterstock.com/image-photo/headset-customer-support-equipment-call-600nw-2103056624.jpg')] bg-cover bg-center h-[40vh] flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black text-center shadow-lg">
            Support Center
          </h1>
        </div>
      </div>

      {/* Support Options */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          How can we assist you?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* FAQs */}
          <button
            onClick={() => router.push("/faqs")}
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg cursor-pointer"
          >
            <HelpCircle size={40} className="text-blue-600" />
            <h3 className="mt-4 font-semibold text-lg">FAQs</h3>
            <p className="text-gray-600">Find answers to common questions.</p>
          </button>

          {/* Live Chat (WhatsApp) */}
          <button
            onClick={() =>
              window.open("https://wa.me/1234567890", "_blank")
            }
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg cursor-pointer"
          >
            <MessageCircle size={40} className="text-green-600" />
            <h3 className="mt-4 font-semibold text-lg">Live Chat</h3>
            <p className="text-gray-600">Chat with our support team on WhatsApp.</p>
          </button>

          {/* Email Support */}
          <button
            onClick={() =>
              window.location.href = "mailto:support@example.com"
            }
            className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center hover:shadow-lg cursor-pointer"
          >
            <Mail size={40} className="text-red-600" />
            <h3 className="mt-4 font-semibold text-lg">Email Support</h3>
            <p className="text-gray-600">Send us an email, and we'll respond quickly.</p>
          </button>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md m-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <form className="space-y-4">
          <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md" required />
          <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md" required />
          <textarea placeholder="Your Message" className="w-full p-3 border rounded-md" rows="4" required></textarea>
          <button className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
