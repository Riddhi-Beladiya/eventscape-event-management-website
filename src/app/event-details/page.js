"use client"
import EventDetailsComponent from '@/Forntend-Component/Details/EventDetailsComponent'
import React, { useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';

const Page = () => {
    const [loading, setLoading] = useState(true);
  
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
  return (
    <div className=" overflow-auto pt-[3.8%] p-2">
      <h1 className="text-3xl font-bold  text-center bg-[url('/Images/eventdetails.png')] w-full bg-cover bg-center text-white p-20">
      Event Details
      </h1>
      <div>
        <EventDetailsComponent/>
      </div>
    </div>
  )
}

export default Page




