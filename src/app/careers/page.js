"use client"; // Ensure it's a client component
import React, { useState } from "react";

const careers = [
  {
    title: "Frontend Developer",
    location: "Remote / Mumbai, India",
    description: "We are looking for a skilled React.js developer to build engaging user interfaces.",
  },
  {
    title: "Backend Developer",
    location: "Remote / Bangalore, India",
    description: "Join our team to work with Node.js, Express, and MongoDB to power EventScape.",
  },
  {
    title: "UI/UX Designer",
    location: "New York, USA",
    description: "Create stunning designs and user-friendly experiences for our platform.",
  },
  {
    title: "Marketing Manager",
    location: "London, UK",
    description: "Lead marketing campaigns and social media strategies for EventScape.",
  },
];

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="overflow-auto min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <h1 className="relative text-5xl font-extrabold text-center text-white bg-[url('https://www.shutterstock.com/image-photo/personal-development-career-growth-success-260nw-386397700.jpg')] bg-cover bg-center p-20 shadow-lg">
          Join EventScape - careers
        </h1>
      </div>

      {/* Introduction */}
      <div className="max-w-5xl mx-auto text-center my-10">
        <p className="text-lg text-gray-700">
          We are always looking for talented individuals to be part of our team. Explore open positions and help shape the future of event management.
        </p>
      </div>

      {/* Job Listings */}
      <div className="max-w-6xl mx-auto py-8 px-6 grid md:grid-cols-2 lg:grid-cols-2 gap-8">
        {careers.map((job, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 border">
            <h2 className="text-xl font-semibold text-gray-900">{job.title}</h2>
            <p className="text-gray-600">{job.location}</p>
            <p className="mt-2 text-gray-700">{job.description}</p>
            <button 
              onClick={() => setIsModalOpen(true)} 
              className="mt-4 px-5 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {/* Apply Now Section */}
      <div className="max-w-4xl mx-auto text-center py-16">
        <h2 className="text-3xl font-bold text-gray-900">Excited to Join Us?</h2>
        <p className="text-gray-700 mt-2">Send us your resume and let's build amazing events together.</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-6 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Submit Your Resume
        </button>
      </div>

      {/* Modal for Resume Submission */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[500px] lg:w-[600px]">
            <h2 className="text-2xl font-bold mb-6 text-center">Submit Your Resume</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Full Name</label>
                <input
                  type="text"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">Upload Resume</label>
                <input
                  type="file"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
                  accept=".pdf,.doc,.docx"
                  required
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
