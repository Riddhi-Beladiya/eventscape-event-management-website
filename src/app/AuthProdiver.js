"use client";
import { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { app } from "@/firebase-config"; // Import Firebase App

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = getAuth(app); // Ensure Firebase App is passed
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Email & Password Login with API Call
  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://event-login-883aa-default-rtdb.firebaseio.com/login.json",
        { email, password }
      );

      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setUser(null);
    localStorage.removeItem("token");
    setIsLoading(false);
  };

  // Check if user is already logged in (Token Verification)
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setIsLoading(true);
          const response = await axios.post(
            "https://event-login-883aa-default-rtdb.firebaseio.com/login.json",
            { token }
          );
          setUser(response.data.user);
        } catch (error) {
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const userInfo = {
    login,
    logout,
    user,
    setUser,
    isLoading,
    setIsLoading,
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};
