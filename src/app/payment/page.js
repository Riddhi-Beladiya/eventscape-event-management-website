"use client";
import React, { useEffect, useState } from "react";
import { PiTicketThin } from "react-icons/pi";
import { RiVipLine } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import PaymentDetails from "@/Forntend-Component/PaymentDetails";
import { Oval } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
import { fetchEvents } from "@/app/api/Eventapi";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [eventData, setEventData] = useState(null);
  const searchParams = useSearchParams();
  const eventId = searchParams.get("id");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const events = await fetchEvents();
        const event = events.find((ev) => ev.id === eventId);
        setEventData(event);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

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

  const handleTicketSelection = (ticketType) => {
    setSelectedTicket(ticketType);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 min-h-screen py-[5%] bg-gray-100 p-6">
      <div className="w-full max-w-4xl flex flex-col items-start gap-6">
        <h3 className="text-2xl font-semibold text-gray-700">
          <p className="text-lg text-gray-500">Ticket Plan</p>
          Get Your Seat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="border w-full text-center p-6 bg-white rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-[0px_2px_4px_0px_rgba(14,30,37,0.12),0px_2px_16px_0px_rgba(14,30,37,0.32)]">
            <section className="flex justify-center items-center w-full h-[8vh]">
              <PiTicketThin className="text-7xl text-gray-500" />
            </section>

            <section className="text-center">
              <h1 className="text-xl text-gray-500">Standard Ticket</h1>
              <i className="fa fa-barcode text-gray-500 text-3xl mt-2"></i>
            </section>

            <section className="text-center my-3">
              <h2 className="text-4xl text-blue-900 font-bold">
                ${eventData ? eventData.price : "N/A"}
              </h2>
            </section>

            <section className="px-4">
              <ul className="text-gray-700 list-inside text-center p-3">
                <li className="py-3 border-b">
                  Full access to all lectures and workshops
                </li>
                <li className="py-3 border-b flex justify-center items-center gap-2">
                  <IoClose className="text-2xl text-red-700 font-bold" /> Video
                  presentations
                </li>
                <li className="py-3 border-b flex justify-center items-center gap-2">
                  <IoClose className="text-2xl text-red-700 font-bold" /> Meet
                  all of our event speakers
                </li>
              </ul>
            </section>

            <button
              className="btn mt-4"
              onClick={() => handleTicketSelection("Standard Ticket")}
            >
              Become a Member
            </button>
          </div>

          <div
            className="border w-full text-center p-6 bg-white rounded-lg 
                          transform transition-all duration-300 hover:scale-105
                          hover:shadow-[0px_2px_4px_0px_rgba(14,30,37,0.12),0px_2px_16px_0px_rgba(14,30,37,0.32)]"
          >
            <section className="flex justify-center items-center w-full h-[8vh] relative">
              <PiTicketThin className="text-7xl text-gray-500" />
              <RiVipLine className="absolute top-1/2 left-[51%] transform -translate-x-1/2 -translate-y-1/2 text-lg text-blue-900" />
            </section>

            <section className="text-center">
              <h1 className="text-xl text-gray-500">VIP Ticket</h1>
              <i className="fa fa-barcode text-gray-500 text-3xl mt-2"></i>
            </section>

            <section className="text-center my-3">
              <h2 className="text-4xl text-blue-900 font-bold">
                ${eventData ? eventData.price * 5 : "N/A"}
              </h2>
            </section>

            <section className="px-4">
              <ul className="text-gray-700 list-inside text-center p-3">
                <li className="py-3 border-b">
                  Full access to all lectures and workshops
                </li>
                <li className="py-3 border-b">Video presentations</li>
                <li className="py-3 border-b">
                  Meet all of our event speakers
                </li>
              </ul>
            </section>

            <button
              className="btn mt-4"
              onClick={() => handleTicketSelection("VIP Ticket")}
            >
              Become a Member
            </button>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md">
        <PaymentDetails selectedTicket={selectedTicket} event={eventData} />
      </div>
    </div>
  );
};

export default Page;
