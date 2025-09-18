

"use client";
import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { MdOutlineDeleteForever } from "react-icons/md";


const Page = () => {
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
 
  const [guestList, setGuestList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!guestName || !email || !phone ) {
      alert("Please fill in all fields!");
      return;
    }

    const guestData = {
      guestName,
      email,
      phone,
    
    };

    setGuestList((prevList) => [...prevList, guestData]);
    alert("Guest Added Successfully!");

    // Reset form fields
    setGuestName("");
    setEmail("");
    setPhone("");
   
  };

  const handleDelete = (index) => {
    const updatedList = guestList.filter((_, i) => i !== index);
    setGuestList(updatedList);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

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
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Guest</h2>

      <div className="flex w-full gap-20 flex-wrap">
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-[30%] bg-white p-6 rounded-lg shadow-md"
        >
          {/* Guest Name */}
          <div>
            <label className="block py-1 text-gray-700 font-medium">
              Guest Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter guest name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block py-1 text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block py-1 text-gray-700 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Address */}
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Confirm
          </button>
        </form>

        <div className="mt-10 w-[60%]">
          <h3 className="text-xl font-bold mb-4">Guest List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-6 border-b text-left text-gray-700 font-semibold">
                    Name
                  </th>
                  <th className="py-3 px-6 border-b text-left text-gray-700 font-semibold">
                    Email
                  </th>
                  <th className="py-3 px-6 border-b text-left text-gray-700 font-semibold">
                    Phone
                  </th>
                  <th className="py-3 px-6 border-b text-left text-gray-700 font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamic rows from guestList */}
                {guestList.map((guest, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition">
                    <td className="py-3 px-6 border-b text-gray-600">
                      {guest.guestName}
                    </td>
                    <td className="py-3 px-6 border-b text-gray-600">
                      {guest.email}
                    </td>
                    <td className="py-3 px-6 border-b text-gray-600">
                      {guest.phone}
                    </td>
                    <td className="py-3 px-6 border-b">
                    <MdOutlineDeleteForever
                        onClick={() => {
                          setDeleteIndex(index);
                          setShowConfirm(true);
                        }}
                        className="text-red-500 text-3xl "
                      />                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Confirmation Modal */}
          {showConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-md w-[300px]">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Are you sure you want to delete this guest?
                </h2>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => {
                      setShowConfirm(false);
                      setDeleteIndex(null);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    No
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(deleteIndex);
                      setShowConfirm(false);
                      setDeleteIndex(null);
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
