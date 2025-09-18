"use client";

import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Event from "../All-Events/Event";
import { fetchEvents } from "@/app/api/Eventapi";
import { Oval } from "react-loader-spinner"; // Import the loader
import "./Mostpopularevents.css";

const MostPopularEvents = () => {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const getEvents = async () => {
      try {
        const events = await fetchEvents();
        setEventsData(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    getEvents();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="bg-[url('https://coolbackgrounds.io/images/backgrounds/white/white-radial-gradient-a5802da1.jpg')] bg-cover bg-center opacity-90 p-10">
      <h3 className="font-bold text-3xl mb-6 text-center">Most Popular Events</h3>

      {loading ? (
        // Loader - Centered on the screen
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="flex flex-col items-center text-blue-900">
            <Oval visible={true} height={80} width={40} color="#08318a" secondaryColor="#749ffc" ariaLabel="loading" />
            <p className="text-center mt-2">Loading event details...</p>
          </div>
        </div>
      ) : eventsData.length > 0 ? (
        <div className="mx-auto p-2 px-10 slider-container">
          <Slider {...settings}>
            {eventsData.map((event) => (
              <Event key={event.id} event={event} />
            ))}
          </Slider>
        </div>
      ) : (
        <p className="text-center text-gray-500">No events available.</p>
      )}
    </div>
  );
};

export default MostPopularEvents;
