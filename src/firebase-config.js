// src/firebase-config.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB-4G7n315V14DowS9ikL0SBlfTD0K3B_c",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "event-login-883aa",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
