// "use client"
// import React, { useEffect, useState } from "react";
// import {
//   FaEnvelope,
//   FaWhatsapp,
//   FaSkype,
//   FaFacebook,
//   FaInstagram,
//   FaTwitter,
//   FaLinkedin,
// } from "react-icons/fa";
// import { Oval } from "react-loader-spinner";

// const Page = () => {
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
//     <section className="bg-gray-100 pt-[3.8%] h-screen flex justify-center items-center py-12">
//       <div className="w-[60%] bg-white shadow-lg rounded-lg xl:p-8 md:mt-14 mt-8 ">
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Left Side - Contact Form */}
//           <div className="p-6">
//             <h3 className="text-2xl font-bold text-gray-800 mb-6">
//               SEND US A MESSAGE
//             </h3>
//             <form action="#" className="space-y-4">
//               <div className="flex flex-col space-y-3">
//                 <label htmlFor="email" className="font-medium">
//                   Your email
//                 </label>
//                 <input
//                   type="text"
//                   id="email"
//                   placeholder="name@eventscape.com"
//                   className="p-3 border rounded-lg w-full"
//                 />

//                 <label htmlFor="subject" className="font-medium">
//                   Subject
//                 </label>
//                 <input
//                   type="text"
//                   id="subject"
//                   placeholder="Let us know how we can help you"
//                   className="p-3 border rounded-lg w-full"
//                 />

//                 <label htmlFor="message" className="font-medium">
//                   About Your Project
//                 </label>
//                 <textarea
//                   id="message"
//                   placeholder="Write your message here..."
//                   className="p-3 border rounded-lg w-full h-28"
//                 ></textarea>
//               </div>

//               <button className="btn"> submit</button>
//             </form>
//           </div>

//           {/* Right Side - Contact Info & Social Links */}
//           <div className="p-6 btn">
//             <h5 className="text-xl font-semibold mb-4">Say Hi!</h5>
//             <ul className="space-y-3">
//               <li className="flex items-center gap-3">
//                 <FaEnvelope />{" "}
//                 <a
//                   href="mailto:info@stackfindover.com"
//                   className="hover:underline"
//                 >
//                   info@stackfindover.com
//                 </a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <FaWhatsapp />{" "}
//                 <a href="tel:+919602381997" className="hover:underline">
//                   +91 9602381997
//                 </a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <FaSkype />{" "}
//                 <a href="#" className="hover:underline">
//                   Stackfindover
//                 </a>
//               </li>
//             </ul>
//             <div className="mt-6 flex gap-4">
//               <a href="#" className="text-white text-2xl hover:text-gray-300">
//                 <FaFacebook />
//               </a>
//               <a href="#" className="text-white text-2xl hover:text-gray-300">
//                 <FaInstagram />
//               </a>
//               <a href="#" className="text-white text-2xl hover:text-gray-300">
//                 <FaTwitter />
//               </a>
//               <a href="#" className="text-white text-2xl hover:text-gray-300">
//                 <FaLinkedin />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Page;





"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaWhatsapp,
  FaSkype,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Oval } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.subject || !formData.message) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.post(
        "https://event-contactus-default-rtdb.firebaseio.com/contactus.json",
        formData
      );
      toast.success("Message sent successfully!");
      setFormData({ email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error saving message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center fixed inset-0 bg-white z-50">
        <div className="flex flex-col items-center text-blue-900">
          <Oval visible={true} height={80} width={40} color="#08318a" secondaryColor="#749ffc" ariaLabel="loading" />
          <p className="text-center mt-2">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-100 pt-[3.8%] h-screen flex justify-center items-center py-12">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-[60%] bg-white shadow-lg rounded-lg xl:p-8 md:mt-14 mt-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">SEND US A MESSAGE</h3>
            
            <form 
  onSubmit={handleSubmit} 
  className="space-y-4 bg-white p-6 shadow-lg rounded-xl max-w-lg mx-auto"
>
  <div className="flex flex-col">
    <label htmlFor="email" className="font-medium text-gray-700">Your Email</label>
    <input 
      type="email" 
      id="email" 
      placeholder="name@example.com" 
      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
      value={formData.email} 
      onChange={handleChange} 
      required 
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="subject" className="font-medium text-gray-700">Subject</label>
    <input 
      type="text" 
      id="subject" 
      placeholder="Let us know how we can help you" 
      className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
      value={formData.subject} 
      onChange={handleChange} 
      required 
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="message" className="font-medium text-gray-700">Message</label>
    <textarea 
      id="message" 
      placeholder="Write your message here..." 
      className="p-3 border border-gray-300 rounded-lg w-full h-28 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
      value={formData.message} 
      onChange={handleChange} 
      required
    ></textarea>
  </div>

  <button 
    type="submit" 
    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold"
  >
    Submit
  </button>
</form>

          </div>

          <div className="p-6 btn">
            <h5 className="text-xl font-semibold mb-4">Say Hi!</h5>
            <ul className="space-y-3">
              <li className="flex items-center gap-3"><FaEnvelope /><a href="mailto:info@stackfindover.com" className="hover:underline">info@stackfindover.com</a></li>
              <li className="flex items-center gap-3"><FaWhatsapp /><a href="tel:+919602381997" className="hover:underline">+91 9602381997</a></li>
              <li className="flex items-center gap-3"><FaSkype /><a href="#" className="hover:underline">Stackfindover</a></li>
            </ul>
            <div className="mt-6 flex gap-4">
              <a href="#" className="text-white text-2xl hover:text-gray-300"><FaFacebook /></a>
              <a href="#" className="text-white text-2xl hover:text-gray-300"><FaInstagram /></a>
              <a href="#" className="text-white text-2xl hover:text-gray-300"><FaTwitter /></a>
              <a href="#" className="text-white text-2xl hover:text-gray-300"><FaLinkedin /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
