"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import {
  fetchEvents,
  addEvent,
  updateEvent,
  deleteEvent,
} from "../api/Eventapi";
import { Oval } from "react-loader-spinner";

const Page = () => {
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState({
    id: "",
    title: "",
    organizer: "",
    type: "",
    category: "",
    location: "",
    fromDate: "",
    toDate: "",
    startTime: "",
    image: null,
    description: "",
    price: "", // Added price field
    seat: "", // Added seat field
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEventDetails((prevDetails) => ({
        ...prevDetails,
        image: reader.result,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addEvent = async () => {
    const {
      title,
      organizer,
      type,
      category,
      location,
      fromDate,
      toDate,
      startTime,
      image,
      description,
      price, // Added sets field
      seat, // Added seat field
    } = eventDetails;
    if (!title || !fromDate || !toDate) {
      alert(
        "Please fill in all required fields: Title, From Date, and To Date."
      );
      return;
    }
    if (title && fromDate && toDate) {
      const newEvent = {
        title,
        organizer,
        type,
        category,
        location,
        start: `${fromDate}T${startTime}`,
        end: toDate,
        image,
        description,
        price, // Added sets field
        seat, // Added seat field
      };

      const addedEvent = await addEvent(newEvent);
      if (addedEvent) {
        const updatedEvents = [...events, addedEvent];
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        toast.success("Event added successfully!");
      } else {
        toast.error("Failed to add event.");
      }

      setEventDetails({
        id: "",
        title: "",
        organizer: "",
        type: "",
        category: "",
        location: "",
        fromDate: "",
        toDate: "",
        startTime: "",
        image: null,
        description: "",
        price: "", // Reset sets field
        seat: "", // Reset seat field
      });
      setIsModalOpen(false);
    }
  };

  const updateEvent = async () => {
    const {
      id,
      title,
      organizer,
      type,
      category,
      location,
      fromDate,
      toDate,
      startTime,
      image,
      description,
      price, // Added sets field
      seat, // Added seat field
    } = eventDetails;
    if (!title || !fromDate || !toDate) {
      alert(
        "Please fill in all required fields: Title, From Date, and To Date."
      );
      return;
    }
    if (title && fromDate && toDate) {
      const updatedEvent = {
        title,
        organizer,
        type,
        category,
        location,
        start: `${fromDate}T${startTime}`,
        end: toDate,
        image,
        description,
        price, // Added sets field
        seat, // Added seat field
      };

      const updatedEventData = await updateEvent(id, updatedEvent);
      if (updatedEventData) {
        const updatedEvents = events.map((event) =>
          event.id === id ? updatedEventData : event
        );
        setEvents(updatedEvents);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        toast.success("Event updated successfully!");
      } else {
        toast.error("Failed to update event.");
      }

      setEventDetails({
        id: "",
        title: "",
        organizer: "",
        type: "",
        category: "",
        location: "",
        fromDate: "",
        toDate: "",
        startTime: "",
        image: null,
        description: "",
        price: "", // Reset sets field
        seat: "", // Reset seat field
      });
      setIsModalOpen(false);
      setIsEditing(false);
      setCurrentEventId(null);
    }
  };

  const deleteEvent = async (index) => {
    const eventToDelete = events[index];
    const success = await deleteEvent(eventToDelete.id);
    if (success) {
      const updatedEvents = events.filter((_, i) => i !== index);
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
      toast.success("Event deleted successfully!");
    } else {
      toast.error("Failed to delete event.");
    }
  };

  const handleEdit = (event) => {
    setEventDetails({
      id: event.id,
      title: event.title,
      organizer: event.organizer,
      type: event.type,
      category: event.category,
      location: event.location,
      fromDate: event.start ? event.start.split("T")[0] : "",
      toDate: event.end,
      startTime: event.start ? event.start.split("T")[1] : "",
      image: event.image || null,
      description: event.description || "",
      price: event.price || "", // Added price field
      seat: event.seat || "", // Added seat field
    });
    setIsEditing(true);
    setCurrentEventId(event.id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
      setEvents(storedEvents);

      const eventData = await fetchEvents();
      if (eventData.length > 0) {
        setEvents(eventData);
        localStorage.setItem("events", JSON.stringify(eventData));
      }
    };

    fetchAndSetEvents();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const [loading, setLoading] = useState(true);
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
    <div className="container mx-auto p-6">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="page-header text-center mb-6">
        <h1 className="text-2xl font-bold">Example of Calendar</h1>
      </div>

      <div className="w-full flex justify-end mt-6 p-1">
        <button
          type="button"
          className="btn"
          onClick={() => setIsModalOpen(true)}
        >
          Add Event
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg overflow-auto h-[80%] w-[50%]">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Edit Event" : "Add New Event"}
            </h2>
            <form>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="form-group">
                  <label htmlFor="id" className="block py-1 text-gray-700">
                    Event Id:
                  </label>
                  <input
                    type="text"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter event ID"
                    id="id"
                    value={eventDetails.id}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="title" className="block py-1 text-gray-700">
                    Event Title: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter event title"
                    id="title"
                    value={eventDetails.title || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="organizer"
                    className="block py-1 text-gray-700"
                  >
                    Organizer:
                  </label>
                  <input
                    type="text"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter organizer"
                    id="organizer"
                    value={eventDetails.organizer || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type" className="block py-1 text-gray-700">
                    Type:
                  </label>
                  <select
                    id="type"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    value={eventDetails.type || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select type</option>
                    <option value="Conference">Conference</option>
                    <option value="Meetup">Meetup</option>
                    <option value="Workshop">Workshop</option>
                  </select>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="category"
                    className="block py-1 text-gray-700"
                  >
                    Category:
                  </label>
                  <select
                    id="category"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    value={eventDetails.category || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select category</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Health">Health</option>
                    <option value="party">Party</option>
                  </select>
                </div>
                <div className="form-group">
                  <label
                    htmlFor="location"
                    className="block py-1 text-gray-700"
                  >
                    Location:
                  </label>
                  <input
                    type="text"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter location"
                    id="location"
                    value={eventDetails.location || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="fromDate"
                    className="block py-1 text-gray-700"
                  >
                    From: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="fromDate"
                    value={eventDetails.fromDate || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="toDate" className="block py-1 text-gray-700">
                    To: <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="toDate"
                    value={eventDetails.toDate || ""}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="startTime"
                    className="block py-1 text-gray-700"
                  >
                    Start Time:
                  </label>
                  <input
                    type="time"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="startTime"
                    value={eventDetails.startTime || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="price" className="block py-1 text-gray-700">
                    Price:
                  </label>
                  <input
                    type="number"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter price"
                    id="price"
                    value={eventDetails.price || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="seat" className="block py-1 text-gray-700">
                    Seat:
                  </label>
                  <input
                    type="number"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter seat"
                    id="seat"
                    value={eventDetails.seat || ""}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-span-2">
                  <label htmlFor="image" className="block py-1 text-gray-700">
                    Event Image:
                  </label>
                  <input
                    type="file"
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    id="image"
                    onChange={handleFileChange}
                  />
                  {eventDetails.image && (
                    <img
                      src={eventDetails.image}
                      alt={eventDetails.title}
                      className="w-16 h-16 object-cover rounded mt-2"
                    />
                  )}
                </div>
                <div className="form-group col-span-2">
                  <label
                    htmlFor="description"
                    className="block py-1 text-gray-700"
                  >
                    Description:
                  </label>
                  <textarea
                    className="form-control w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter event description"
                    id="description"
                    value={eventDetails.description || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEditing(false);
                  setCurrentEventId(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded"
                onClick={isEditing ? updateEvent : addEvent}
              >
                {isEditing ? "Update Event" : "Add Event"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Event List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border  border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200 text-center">
              <tr>
                <th className="py-3 px-6 border-b  text-gray-700 font-semibold">
                  Id
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Title
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Organizer
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Type
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Category
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Location
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  From
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  To
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Start Time
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  price
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Seat
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Image
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Description
                </th>
                <th className="py-3 px-6 border-b text-gray-700 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index} className="hover:bg-gray-100 transition">
                  <td className="py-3 px-6 border-b text-gray-600">
                    {event.id}
                  </td>
                  <td className="py-3 px-6 border-b text-gray-600">
                    {event.title}
                  </td>
                  <td className="py-3 px-6 border-b text-nowrap text-gray-600">
                    {event.organizer}
                  </td>
                  <td className="py-3 px-6 border-b text-nowrap text-gray-600">
                    {event.type}
                  </td>
                  <td className="py-3 px-6 border-b text-nowrap text-gray-600">
                    {event.category}
                  </td>
                  <td className="py-3 px-6 border-b text-nowrap text-gray-600">
                    {event.location}
                  </td>
                  <td className="py-3 px-6 border-b text-nowrap text-gray-600">
                    {event.start ? event.start.split("T")[0] : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-nowrap border-b text-gray-600">
                    {event.end}
                  </td>
                  <td className="py-3 px-6 text-nowrap border-b text-gray-600">
                    {event.start ? event.start.split("T")[1] : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-nowrap border-b text-gray-600">
                    {event.price}
                  </td>
                  <td className="py-3 px-6 text-nowrap border-b text-gray-600">
                    {event.seat}
                  </td>
                  <td className="py-3 px-6 text-nowrap border-b text-gray-600">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-3 px-6 text-nowrap border-b text-gray-600">
                    {event.description}
                  </td>

                  <td className="py-3  px-6 text-3xl text-nowrap border-b text-gray-600">
                    <button
                      className="text-blue-500 px-4 "
                      onClick={() => handleEdit(event)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 "
                      onClick={() => deleteEvent(index)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
