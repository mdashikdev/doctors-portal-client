// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBUj-y8pgQ1ftHRYar5T_-CdC430jmScQc",
  authDomain: "doctor-portal-2df70.firebaseapp.com",
  projectId: "doctor-portal-2df70",
  storageBucket: "doctor-portal-2df70.appspot.com",
  messagingSenderId: "48579385472",
  appId: "1:48579385472:web:1e6c43e8a628c4e3a8ee65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);