"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { CiLocationOn } from "react-icons/ci";
import { HiCalendarDateRange } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";

const PaymentDetails = ({ selectedTicket, event }) => {
  const [count, setCount] = useState(1);
  const [price, setPrice] = useState(0); // Initialize with 0
  const [taxes, setTaxes] = useState(0.1);
  const [total, setTotal] = useState(0); // Initialize with 0
  const router = useRouter();

  const [loadingButton, setLoadingButton] = useState(false);

  useEffect(() => {
    if (event) {
      setPrice(selectedTicket === "VIP Ticket" ? event.price * 5 : event.price);
    }
  }, [selectedTicket, event]);

  useEffect(() => {
    setTotal(count * price * (1 + taxes));
  }, [count, price, taxes]);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   setIsLoggedIn(!!token); // ✅ Set true if token exists, false otherwise
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token); // ✅ Set true if token exists, false otherwise
    }, 1000); // ⏳ 1-second delay

    return () => clearTimeout(timer); // ✅ Cleanup function
  }, []);

  const handlePurchase = () => {
    setLoadingButton(true);
    if (!isLoggedIn) {
      sessionStorage.setItem(
        "prevPage",
        window.location.pathname + window.location.search
      ); // ✅ Store prevPage
      console.log(
        "🔹 prevPage Stored Before Redirect:",
        sessionStorage.getItem("prevPage")
      );

      router.push("/auth-login");
    } else {
      router.push(`/ticket-booking?id=${event.id}`);
    }
  };

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
    <div className="w-full">
      <h3 className="text-xl font-bold py-2">Payment details</h3>
      <div className="border h-auto w-full p-6 bg-blue-50">
        <p className="text-lg font-bold py-1">Order Summary</p>
        {event ? (
          <>
            <p className="p-1 text-xl uppercase">{event.title}</p>
            <div className="flex py-2 justify-start gap-4">
              <Image
                src={event.image || "/Images/banner1.jpg"}
                alt="Event Details"
                width={500}
                height={500}
                className="w-32 h-20"
              />
              <h1 className="text-lg text-gray-500">{selectedTicket}</h1>
              <p className="text-2xl right-0 text-blue-900 font-bold">
                ${price}
              </p>
            </div>
            <div className="flex gap-2 py-1">
              <HiCalendarDateRange className="text-xl" />
              <p>
                {event.start
                  ? `${formatDate(event.start)} at ${formatTime(event.start)}`
                  : "Date Unavailable"}
              </p>
            </div>
            <div className="flex gap-2">
              <CiLocationOn className="text-2xl" />
              <p>{event.location}</p>
            </div>
          </>
        ) : (
          <p className="p-1 text-red-500">Event details not available</p>
        )}
        <section className="text-center py-3 flex justify-between border-b my-1">
          <p className="">Taxes</p>
          <p className="text-xl">${(count * price * taxes).toFixed(2)}</p>
        </section>
        <section className="font-bold text-blue-900 text-xl flex justify-between">
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </section>
        <section className="text-lg flex justify-start gap-4 items-center w-full p-2">
          <p>Buy more tickets</p>
          <div className="flex items-center gap-4">
            <button
              onClick={decreaseCount}
              className="border px-3 py-2 rounded-lg text-xl"
            >
              -
            </button>
            <span>{count}</span>
            <button
              onClick={increaseCount}
              className="border px-3 py-2 rounded-lg text-xl"
            >
              +
            </button>
          </div>
        </section>

        <button
          className="btn mt-4 mx-3"
          onClick={handlePurchase}
          disabled={loadingButton}
        >
          {loadingButton ? (
            <Oval
              height="20"
              width="100"
              color="#fff"
              secondaryColor="#ccc"
              visible={true}
              ariaLabel="loading"
            />
          ) : (
            <>{isLoggedIn ? "Book Ticket" : "Login to Purchase"}</>
          )}
        </button>

        <Link href="/event-details">
          <p className="text-blue-900 border-b px-2 inline-table border-gray-400">
            Cancel payment
          </p>
        </Link>
      </div>
    </div>
  );
};

export default PaymentDetails;
