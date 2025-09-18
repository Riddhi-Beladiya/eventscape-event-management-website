

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const Page = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          "https://event-contactus-default-rtdb.firebaseio.com/contactus.json"
        );

        if (response.data) {
          // Convert Firebase object into an array
          const messagesArray = Object.entries(response.data).map(([id, message]) => ({
            id,
            ...message,
          }));
          setMessages(messagesArray);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
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
    <section className="p-6">
      <h2 className="text-xl font-semibold mb-4">Client Messages</h2>

      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead className="bg-gray-200 text-center">
              <tr>
                <th className="border border-gray-300 px-2 py-2 w-[30%]">Email</th>
                <th className="border border-gray-300 px-4 py-2 w-[20%]">Subject</th>
                <th className="border border-gray-300 px-6 py-2 w-[60%]">Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map(({ id, email, subject, message }) => (
                <tr key={id} className="hover:bg-gray-100 transition text-center">
                  <td className="py-3 px-2 border text-gray-600 w-[20%]">{email}</td>
                  <td className="py-3 px-4 border text-gray-600 w-[20%]">{subject}</td>
                  <td className="py-3 px-6 border text-gray-600 w-[60%]">{message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Page;
