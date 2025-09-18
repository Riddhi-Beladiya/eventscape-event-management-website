"use client"  
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Hostyoureventwithus = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/request-organizer"); // Navigate to the Request_Organizer page
  };

  return (
    <div className="w-full md:h-[30rem] h-[23rem] flex justify-center">
      <div className="relative w-full xl:w-[80%] flex justify-between">
        <Image
          src="/Images/banner1.jpg"
          alt="Event Banner"
          width={900}
          height={400}
          className="w-[60%] md:w-[50%] xl:w-[35%] rounded-lg object-cover h-[290px] md:h-[400px] absolute top-[26%] left-5  xl:left-44 lg:left-32 md:left-20 -translate-y-[20%] z-0"
        />

        <div className="absolute top-[18%] md:top-[20%] xl:right-44 right-5 xl:right-39 lg:right-36 md:right-20 w-[65%] h-[230px] md:h-[300px] flex flex-col justify-center bg-white p-4 md:px-9 px-5 xl:w-[45%] lg:w-[50%] md:text-left md:w-[45%] shadow-xl rounded-xl z-10 ">

          <h2 className="text-[13px] xl:text-3xl font-bold text-gray-800 lg:text-[30px] md:text-[24px]">
            Host Your Event with Us
          </h2>
          <p className="text-gray-600 mt-3 leading-relaxed indent-8 lg:text-[14px] md:text-[12px] text-[8px] md:text-0.9rem">
            Dream Craft Events: Where your vision meets perfection. From
            corporate conferences to intimate gatherings, we specialize in
            flawless event management. With our expertise, let us handle the
            stress while you enjoy every moment. Contact us today and let's
            create magic together.
          </p>
          <button onClick={handleClick} className="mt-4 w-[180px] lg:w-full md:w-[200px] btn text-center">
            Request Organizer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hostyoureventwithus;
