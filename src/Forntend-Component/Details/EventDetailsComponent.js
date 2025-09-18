"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchEvents } from "@/app/api/Eventapi";
import { HiCalendarDateRange } from "react-icons/hi2";
import { TiFlowMerge } from "react-icons/ti";
import { CiLocationOn } from "react-icons/ci";
import { TfiMenuAlt } from "react-icons/tfi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BsLightning } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import { PiNotebookBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import Speakers from "./Speakers";
import { Oval } from "react-loader-spinner";

const EventDetailsComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams.get("id");

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [loadingButton, setLoadingButton] = useState(false);

  const handleClick = () => {
    setLoadingButton(true);
    setTimeout(() => {
      router.push(`/payment?id=${eventId}`);
    }, 2000);
  };

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const events = await fetchEvents();
        if (!events || events.length === 0) {
          console.error("No events found in API response.");
          return;
        }

        const event = events.find((ev) => ev.id === eventId);
        if (!event) {
          console.error(`No data received for event ID: ${eventId}`);
          return;
        }

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

  if (loading) {
    return (
      <div className="flex justify-center flex-col items-center h-screen text-blue-900">
        <Oval
          visible={true}
          height="80"
          width="40"
          color="#08318a"
          secondaryColor="#749ffc"
          ariaLabel="loading"
        />
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!eventData) {
    return (
      <p className="text-center text-red-500">
        Event not found or data is missing.
      </p>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className=" overflow-auto p-2 flex justify-center gap-10">
      <div className=" h-full w-1/2 p-5">
        <Image
          src={eventData.image || "/fallback-image.jpg"}
          alt={eventData.title || "Event Image"}
          width={1200}
          height={1000}
          quality={90}
          className="w-full h-auto object-cover"
        />

        <div className="flex justify-between text-lg py-4 border-b text-blue-900 ">
          <div className="flex gap-2 ">
            <HiCalendarDateRange className="text-2xl" />
            <p className="text--subtitle">
              {eventData.start
                ? `${formatDate(eventData.start)} at ${formatTime(
                    eventData.start
                  )}`
                : "Date Unavailable"}
            </p>
            {/* {eventData.start || "Date Unavailable"} */}

            {/* <p>{eventData.fromDate || "Date Unavailable"}</p> */}
          </div>
          <div className="flex font-bold text-xl gap-2">
            <TiFlowMerge className="text-2xl" />
            <span className="">{eventData.seat || "N/A"} Seat </span>
          </div>
          <div className="flex gap-2">
            <CiLocationOn className="text-2xl" />
            <p>{eventData.location || "Location Unavailable"}</p>
          </div>
        </div>
        <div className="flex justify-between text-lg py-5 border-b text-blue-900 ">
          <div className="flex gap-4 items-center ">
            <TfiMenuAlt className="text-xl " />
            <div>
              <span className="font-bold text-base">Event Type</span>
              <p className="text-sm">{eventData.category}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center ">
            <HiOutlineSpeakerphone className="text-xl " />
            <div>
              <span className="font-bold text-base">Speaker</span>
              <p className="text-sm">10 Best Speaker</p>
            </div>
          </div>
          <div className="flex gap-4 items-center ">
            <BsLightning className="text-xl " />
            <div>
              <span className="font-bold text-base">Sponsor</span>
              <p className="text-sm">Event Lab</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center text-lg gap-4 py-5">
          <button className="bg-blue-900 btn text-white p-2 rounded-md ">
            $ <span className="text-3xl">{eventData.price || "Free"}</span>{" "}
            /seat
          </button>
          <button
            onClick={handleClick}
            className="bg-blue-900 w-[25%] flex gap-2 items-center justify-center text-xl text-white p-2 rounded-md relative"
            disabled={loadingButton}
          >
            {loadingButton ? (
              <Oval
                height={20}
                width={20}
                color="#fff"
                secondaryColor="#ccc"
                visible={true}
                ariaLabel="loading"
              />
            ) : (
              <>
                <IoTicketOutline className="text-3xl" />
                Get The Ticket
              </>
            )}
          </button>
        </div>

        <div className="mb-2">
          <h2 className="text-3xl font-bold py-2 text-blue-900">
            {eventData.title}
          </h2>
          <p className="text-lg indent-8">{eventData.description}</p>
        </div>
        <div className="flex items-center justify-between p-2">
          <div className="w-full ">
            <h4 className="text-2xl font-bold py-3">Overview</h4>
            <div className="font-bold text-lg/8">
              <p className="flex gap-2 items-center ">
                <FaCheck className="text-lg " />
                You Got Full Free Certificate.
              </p>
              <p className="flex gap-2 items-center ">
                <FaCheck className="text-lg " />
                Unlimited Coffe & Tea When U Boring.
              </p>
              <p className="flex gap-2 items-center ">
                <FaCheck className="text-lg " />
                Comfortable Seating Areas.
              </p>
              <p className="flex gap-2 items-center ">
                <FaCheck className="text-lg " />
                Wi-Fi Access..
              </p>
              <p className="flex gap-2 items-center ">
                <FaCheck className="text-lg " />
                Lunch Suspendisse In Commodo Feli.
              </p>
            </div>
          </div>
          <div className="flex justify-center  gap-2 ">
            <Image
              src="/Images/eventdetails.png"
              alt={eventData.title || "Event Image"}
              width={1200}
              height={1000}
              quality={90}
              className="w-[45%] h-auto object-cover"
            />
            <Image
              src="/Images/banner4.png"
              alt={eventData.title || "Event Image"}
              width={1200}
              height={1000}
              quality={90}
              className="w-[45%] h-auto object-cover"
            />
          </div>
        </div>
        <Speakers />
      </div>
      <div className=" w-[30%] p-5">
        <div className="flex flex-col gap-4">
          <button className="bg-blue-900 btn flex gap-1 text-2xl  text-nowrap w-[40%] text-white p-2 rounded-md ">
            <PiNotebookBold className="text-3xl" />
            Recent Event
          </button>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Image
                src="/Images/banner1.jpg"
                alt="Event Details"
                width={500}
                height={500}
                className="w-36 h-28"
              />
              <div className="flex flex-col gap-2 items-start py-2">
                <h4 className=" font-bold">Film Buff Movie Marathon</h4>
                <div className="flex gap-2 ">
                  <HiCalendarDateRange className="text-xl" />
                  <p>June 3, 2024</p>
                </div>
                <div className="flex text-blue-900 gap-2">
                  <TiFlowMerge className="text-xl" />
                  <span className="">800 Seat</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Image
                src="/Images/banner1.jpg"
                alt="Event Details"
                width={500}
                height={500}
                className="w-36 h-28"
              />
              <div className="flex flex-col gap-2 items-start py-2">
                <h4 className=" font-bold">Entrepreneurship Summit</h4>
                <div className="flex gap-2 ">
                  <HiCalendarDateRange className="text-xl" />
                  <p>2024-03-15</p>
                </div>
                <div className="flex text-blue-900 gap-2">
                  <TiFlowMerge className="text-xl" />
                  <span className="">200 Seat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsComponent;
