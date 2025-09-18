"use client";
import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCamera,
  FaMapMarkerAlt,
  FaRegCommentDots,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { Oval } from "react-loader-spinner";

const Page = () => {
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [cateringService, setCateringService] = useState("");
  const [specialRequest, setSpecialRequest] = useState(""); // State for textarea

    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
  
      return () => clearTimeout(timer);
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
   <div className="flex p-10 pt-[6%] justify-center gap-8">
     <form
      action="#"
      method="post"
      className="w-[60%] border border-1px  rounded-md shadow-xl flex flex-wrap gap-4 p-6 "
    >
      <h2 className="text-3xl w-full font-bold text-center py-5 ">
        Let us know about your event
      </h2>

      <div className="pb-4 w-[48%]">
        <label className="block text-base font-medium text-gray-700">
          Event Type
        </label>
        <select
          name="eventType"
          id="eventType"
          required
          className="block w-full px-3 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="" disabled>
            Select an Event Type
          </option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday</option>
          <option value="conference">Conference</option>
          <option value="concert">Concert</option>
          <option value="festival">Festival</option>
          <option value="corporate">Corporate Event</option>
        </select>
      </div>

      <div className="pb-4 w-[48%]">
        <label className="block text-base font-medium text-gray-700">
          Date of Event:
        </label>
        <div className="relative">
          <input
            type="date" // Corrected input type
            name="eventDate"
            id="date"
            required
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="block w-full px-3 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {/* Calendar Icon */}
          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="pb-4 w-[48%]">
        <label className="block text-base font-medium text-gray-700">
          Location:
        </label>
        <div className="relative">
          <input
            type="text"
            name="location"
            id="location"
            placeholder="Enter your location"
            required
            minLength="6"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="block w-full px-3 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
          />
          {/* Location Icon */}
          <FaMapMarkerAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="pb-4 w-[48%]">
        <label className="block text-base font-medium text-gray-700">
          Total Guests
        </label>
        <div className="relative">
          <select
            name="guestCount"
            id="guestCount"
            required
            value={guestCount}
            onChange={(e) => setGuestCount(e.target.value)}
            className="block w-full px-3 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-10"
          >
            <option value="" disabled>
              Select Total Guests
            </option>
            <option value="1-250">1-250</option>
            <option value="1-500">1-500</option>
            <option value="1-1000">1-1000</option>
          </select>
          {/* Guests Icon */}
          <FaUsers className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="pb-4 w-[48%]">
        <label className="block text-base font-medium text-gray-700">
          Photography and Videography
        </label>
        <div className="relative">
          <select
            name="serviceType"
            id="serviceType"
            required
            value={serviceType} // ✅ Use `value` instead of `selected`
            onChange={(e) => setServiceType(e.target.value)} // Update state
            className="block w-full px-3 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-10"
          >
            <option value="" disabled>
              Select Service
            </option>
            <option value="Photography">Photography</option>
            <option value="Videography">Videography</option>
            <option value="Photography & Videography">
              Photography and Videography
            </option>
          </select>
          {/* Camera Icon */}
          <FaCamera className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="pb-4 w-[48%]">
        <label className="block text-base font-medium text-gray-700">
          Catering Services
        </label>
        <div className="relative">
          <select
            name="cateringService"
            id="cateringService"
            required
            value={cateringService} // ✅ Use value for controlled component
            onChange={(e) => setCateringService(e.target.value)} // Update state
            className="block w-full px-3 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none pr-10"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {/* Utensils Icon for Catering */}
          <FaUtensils className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="pb-4 w-full">
      <label className="block text-base font-medium text-gray-700">
        Any Special Request
      </label>
      <div className="relative">
        <textarea
          name="specialRequest"
          rows={4} // ✅ Proper rows value
          cols={40} // ✅ Proper cols value
          value={specialRequest} // ✅ Controlled textarea
          onChange={(e) => setSpecialRequest(e.target.value)} // Update state
          placeholder="Enter your special request..."
          className="block w-full px-3 py-3 mt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        ></textarea>
      </div>
    </div>

      <button
        type="submit"
        className="btn w-full"
      >
        Submit
      </button>
    </form>
    <div className="w-1/5 border border-gray-300 shadow-xl p-6 rounded-md bg-white">
  <h3 className="text-xl font-semibold text-gray-500 mb-2">Estimated Cost</h3>
  <p className="text-3xl font-bold py-3 text-blue-600">$5000</p>
  <button className="btn w-full">
    Login to Request
  </button>
</div>

   </div>
  );
};

export default Page;
