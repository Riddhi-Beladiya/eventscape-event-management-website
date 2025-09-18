"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";
import { Oval } from "react-loader-spinner";
import { Link } from "lucide-react";

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
    <div className="overflow-auto p-2 pt-[3.8%]">
      <div
        className="text-3xl font-bold text-center text-white p-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/Images/banner4.png')" }}
      >
        {" "}
        <h1>About Us</h1>
      </div>

      <section className="bg-gray-100 py-16">
        <div className=" mx-auto px-6 lg:px-20 md:w-9/12 ">
          <div className="mt-3 flex gap-4 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Original</h3>
              <p className="mt-4 text-gray-600 indent-8">
                We have the sense fresh, new and original ideas that will ensure
                the event we organize is successful, unique and memorable. And
                We are “Dream Craft Events” With our young and creative minds,
                we always ensure that we bring out outstanding events that are
                easily distinguished from other events of the same field.
              </p>
            </div>
            <Image
              src="/Images/eventaccessorie.png"
              alt="Event Image"
              width={1200}
              height={1900}
              quality={90}
              opacity={0.5}
              className="object-cover w-[40%] h-[100%] "
            />{" "}
          </div>

          <div className="mt-12 flex gap-4 items-center">
            <Image
              src="/Images/eventaccessorie.png"
              alt="Event Image"
              width={1200}
              height={1900}
              quality={90}
              className="object-cover w-[40%] h-[100%]"
            />{" "}
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Creative</h3>
              <p className="mt-4 text-gray-600 indent-8">
                We are creative in every aspect of the event; planning,
                promotional and publicity as well as execution. By being
                creative, our events are more outstanding and will leave a great
                impact not just to us, but to our clients as well.
              </p>
            </div>
          </div>

          <div className="mt-12 flex gap-4 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Maticulous</h3>
              <p className="mt-4 text-gray-600 indent-8">
                We are very particular in every aspect of the event management
                to guarantee the event we organise runs perfectly and
                efficiently.guarantee the event we organise runs perfectly and
                efficiently.
              </p>
            </div>
            <Image
              src="/Images/eventaccessorie.png"
              alt="Event Image"
              width={1200}
              height={1900}
              quality={90}
              className="object-cover w-[40%] h-[100%]"
            />{" "}
          </div>

          <div className="mt-12 flex gap-4 items-center">
            <Image
              src="/Images/eventaccessorie.png"
              alt="Event Image"
              width={1200}
              height={1900}
              quality={90}
              className="object-cover w-[40%] h-[100%]"
            />{" "}
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                Event Services
              </h3>
              <p className="mt-4 text-gray-600 indent-8">
                With many years of experience in event organising, we understand
                that there many factors that lead to a well-organised and
                successful event. These aspects include events sponsorship,
                event marketing and promotions as well as producing event
                merchandising. Each of these aspects is managed carefully as
                they are the main components of the main event.
              </p>
            </div>
          </div>

          <div className="mt-12 flex gap-4 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800">Satisfaction</h3>
              <p className="mt-4 text-gray-600">
                Of course, achieving our clients’ satisfaction is what motivates
                us to bring out the best events. We believe in the strengths of
                each of our team members and we have proved to exceed our
                clients’ expectations and presenting them with successful events
                that raved fantastic reviews around the world!
              </p>
            </div>
            <Image
              src="/Images/eventaccessorie.png"
              alt="Event Image"
              width={1200}
              height={1900}
              quality={90}
              className="object-cover w-[40%] h-[100%]"
            />{" "}
          </div>

          {/* Section 4: Contact Info */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-gray-800">Get in Touch</h3>
            <p className="mt-4 text-gray-600">
              Feel free to reach out to us via email or through our social media
              channels.
            </p>
            <div className="flex justify-center space-x-6 mt-6">
              <a href="https://www.facebook.com/" className="text-blue-600 text-3xl">
                <FaFacebook />
              </a>
              <a href="https://www.instagram.com/accounts/login/" className="text-pink-600 text-3xl">
                <FaInstagram />
              </a>
              <a href="https://x.com/" className="text-blue-400 text-3xl">
                <FaTwitter />
              </a>
              <a href="https://www.linkedin.com/feed/" className="text-blue-700 text-3xl">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;



