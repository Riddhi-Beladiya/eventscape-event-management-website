"use client"
import Banner from "@/Forntend-Component/Homecomponent/Banner";
import Hostyoureventwithus from "@/Forntend-Component/Homecomponent/Hostyoureventwithus";
import Innovatesphere from "@/Forntend-Component/Homecomponent/Innovatesphere";
import Mostpopularevents from "@/Forntend-Component/Homecomponent/Mostpopularevents";
import Ourservices from "@/Forntend-Component/Homecomponent/Ourservices";
import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";

const Page = () => {
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
    <div className="overflow-hidden pt-[3.8%]">
      <div>
        <Banner />
      </div>
      <div>
        <Hostyoureventwithus />
      </div>
      <div>
        <Mostpopularevents />
      </div>
      <div>
        <Ourservices />
      </div>
      <div>
        <Innovatesphere />
      </div>
    </div>
  );
};

export default Page;
