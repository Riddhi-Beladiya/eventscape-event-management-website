import React from "react";

const Page = () => {
  return (
    <div className="pt-[3.8%]">
      <form
        action="#"
        method="post"
        className="max-w-3xl  my-6 border border-gray-300 shadow-xl rounded-md overflow-auto items-center m-auto p-6"
      >
        <h2 className="text-3xl font-bold text-center py-5">
          Request for Organizer
        </h2>

        <div className="pb-4">
          <label className="block text-base font-medium text-gray-700">
            Your Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            id="name"
            required
            minLength="6"
            pattern="[A-Za-z0-9]+"
            title="Use only English letters and numbers."
            className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            autoFocus
          />
        </div>

        <div className="pb-4">
          <label className="block text-base font-medium text-gray-700">
            Email Address:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            id="email"
            required
            className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="pb-4">
          <label className="block text-base font-medium text-gray-700">
            Company Name:
          </label>
          <input
            type="text"
            name="company"
            placeholder="Enter your company name"
            id="company"
            required
            minLength="6"
            className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="pb-4">
          <label className="block text-base font-medium text-gray-700">
            Event Organization Experience:
          </label>
          <input
            type="text"
            name="experience"
            placeholder="Enter your experience"
            id="experience"
            required
            className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="pb-4">
          <label className="block text-base font-medium text-gray-700">
            Event Organization Skills:
          </label>
          <input
            type="text"
            name="skills"
            placeholder="Enter your skills"
            id="skills"
            required
            className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="btn w-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Page;
