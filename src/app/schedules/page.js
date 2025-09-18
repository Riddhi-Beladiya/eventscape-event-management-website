"use client";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import FullCalendar from "@fullcalendar/react";
import "../add-events/FullCalendarOverride.css";
import { Oval } from "react-loader-spinner";

const Page = () => {
  const [events, setEvents] = useState([
    { title: "Event 1", start: "2023-10-01" },
    { title: "Event 2", start: "2023-10-05" },
  ]);

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
      <h2 className="text-2xl font-bold mb-4 text-center">Schedules</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
      />
    </div>
  );
};

export default Page;
