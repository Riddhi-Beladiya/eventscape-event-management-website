"use client";

import { createContext, useContext, useState } from "react";

// Create AuthContext
export const AuthContext = createContext();

// Provide AuthContext to the application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function (mock implementation)
  const login = (email, password) => {
    setUser({ email }); // Simulate login
  };

  // Sign up function
  const signUp = (email, password) => {
    setUser({ email }); // Simulate user registration
  };

  // Google login function (mock implementation)
  const googleLogin = () => {
    setUser({ email: "googleuser@example.com" }); // Simulate Google login
  };

  return (
    <AuthContext.Provider value={{ user, login, signUp, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
