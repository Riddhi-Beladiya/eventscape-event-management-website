
"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import "../../Forntend-Component/AuthLogin.css";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { ImCross } from "react-icons/im";
import Link from "next/link";

const Page = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState(
    "https://www.shutterstock.com/image-vector/user-profile-plus-line-icon-600nw-1727825620.jpg"
  );
  const fileInputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const currentPath = window.location.pathname;
    const storedPrevPage = sessionStorage.getItem("prevPage");

    if (!storedPrevPage || storedPrevPage === "/auth-login") {
      sessionStorage.setItem("prevPage", currentPath);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const previewFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://event-login-883aa-default-rtdb.firebaseio.com/login.json"
      );
      const data = await response.json();

      if (!data) {
        toast.error("No users found.");
        return;
      }

      const users = Object.values(data);
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        localStorage.setItem("accessToken", user.token);
        toast.success("Login successful! Redirecting...");

        let prevPage = sessionStorage.getItem("prevPage");
        if (!prevPage || prevPage === "/auth-login") {
          prevPage = "/dashboard";
        }

        setTimeout(() => {
          router.push(prevPage);
          sessionStorage.removeItem("prevPage");
        }, 1000);
      } else {
        toast.error("Invalid email or password.");
      }
    } catch (error) {
      toast.error("Failed to connect. Please try again later.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !image) {
      toast.error("Email, password, and image are required.");
      return;
    }

    try {
      const response = await fetch(
        "https://event-login-883aa-default-rtdb.firebaseio.com/login.json"
      );
      const data = await response.json();

      const users = data ? Object.values(data) : [];
      const existingUser = users.find((user) => user.email === email);

      if (existingUser) {
        toast.error("Email is already registered. Try logging in.");
        return;
      }

      const token = Math.random().toString(36).substring(2, 15);

      const newUser = {
        email,
        password,
        token,
        image,
      };

      await fetch(
        "https://event-login-883aa-default-rtdb.firebaseio.com/login.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        }
      );

      toast.success("Registration successful! Please log in.");
      setActiveTab("login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container pt-[3.8%] ">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} pauseOnHover />
      <div className="auth-box  ">
        <div className="auth-tabs ">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <ImCross
            onClick={() => router.push("/home")}
            className="cursor-pointer text-[18px] ml-auto mt-[10px]"
          />
        </div>

        <div className="auth-content">
          {activeTab === "login" && (
            <div>
              <label>Email</label>
              <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-xl text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >{showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button className="btn w-full" onClick={handleLogin}>
                Login
              </button>
            </div>
          )}

          {activeTab === "register" && (
            <div>
              <div className="flex flex-col items-center mb-4">
                <div className="w-32 h-32 rounded-full flex items-center justify-center relative">
                  <div className="absolute inset-0 border-2 border-dashed border-gray-400 rounded-full animate-spin-slow"></div>
                  <Image
                    src={image}
                    alt="Profile"
                    className="w-[97%] h-[97%] object-cover rounded-full z-10 cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                    width={128}
                    height={128}
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={previewFile}
                />
              </div>

              <label>Email</label>
              <input
                type="email"
                className="auth-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute right-3 text-2xl text-gray-400 top-10 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label>Confirm Password</label>
              <input
                type="password"
                className="auth-input"
                placeholder="Confirm Password"
              />

              <button className="btn w-full" onClick={handleRegister}>
                Register
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Social Links */}
      <div className="auth-social ">
        <p>Follow us on</p>
        <div className="auth-social-links">
          <Link href="https://twitter.com/pixellionmm" target="_blank">
            <FaXTwitter />
          </Link>
          <Link href="https://www.linkedin.com/company/pixellion-creative" target="_blank">
            <BsLinkedin />
          </Link>
          <Link href="https://www.facebook.com/PixellionCreative/" target="_blank">
            <FaFacebook />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
