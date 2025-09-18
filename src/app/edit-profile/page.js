"use client";
import React, { useEffect, useState, useRef } from "react";
import { Oval } from "react-loader-spinner";
import { useRouter } from "next/navigation";
import "./EditProfile.css"; // Import the CSS file
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contact, setContact] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        router.push("/auth-login");
        return;
      }

      try {
        const response = await fetch(
          "https://event-login-883aa-default-rtdb.firebaseio.com/login.json"
        );
        const data = await response.json();
        const users = Object.entries(data);
        const userEntry = users.find(([key, user]) => user.token === token);

        if (userEntry) {
          const [userId, user] = userEntry;
          setUserData(user);
          setId(userId);
          setUsername(user.username || "");
          setEmail(user.email || "");
          setPassword(user.password || "");
          setConfirmPassword(user.password || "");
          setContact(user.contact || "");
          setCity(user.city || "");
          setImage(user.image || "");
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  const handleSaveChanges = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const updatedUser = {
      ...userData,
      username,
      email,
      password,
      contact,
      city,
      image,
    };

    try {
      const response = await fetch(
        `https://event-login-883aa-default-rtdb.firebaseio.com/login/${id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (response.ok) {
        setUserData(updatedUser);
        localStorage.setItem("userData", JSON.stringify(updatedUser));
        toast.success("Event added successfully!");

      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Failed to update user data:", error);
      alert("Failed to update profile");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

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
          <p className="text-center mt-2">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 ">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <div className="flex flex-col items-start md:flex-row">
        <div className="md:w-2/3 text-center mb-6 md:mb-0">
          <div className="w-32 h-32 rounded-full flex items-center justify-center relative mx-auto mb-4">
            <Image
              src={
                image ||
                "https://png.pngitem.com/pimgs/s/150-1503945_transparent-user-png-default-user-image-png-png.png"
              }
              width={100}
              height={100}
              className="w-[97%] h-[97%] object-cover rounded-full z-10"
              alt="avatar"
              onClick={() => fileInputRef.current.click()}
            />
          </div>
          <h6 className="text-lg font-semibold">Upload a different photo...</h6>
          <input
            type="file"
            className="form-control mt-2 hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="md:w-2/3 md:pl-6">
          <h3 className="text-xl font-semibold mb-4">Personal Info</h3>
          <form className="space-y-4">
            <div className="form-group">
              <label className="block text-gray-700">ID:</label>
              <input
                className="form-control w-full p-2 border border-gray-300 rounded"
                type="text"
                value={id}
                readOnly
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700">Username:</label>
              <input
                className="form-control w-full p-2 border border-gray-300 rounded"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700">Email:</label>
              <input
                className="form-control w-full p-2 border border-gray-300 rounded"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700">Password:</label>
              <input
                className="form-control w-full p-2 border border-gray-300 rounded"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700">Confirm Password:</label>
              <input
                className="form-control w-full p-2 border border-gray-300 rounded"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700">Contact:</label>
              <input
                className="form-control w-full p-2 border border-gray-300 rounded"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="block text-gray-700">City:</label>
              <input
                className="form-control w-full p-2 border border-gray-300 rounded"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
              <button
                type="reset"
                className="btn btn-secondary bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
