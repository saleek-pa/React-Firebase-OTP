import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQJ1hrd57w8kWy_ze9nv991SUDbFFLlws",
  authDomain: "phone-otp-fd564.firebaseapp.com",
  projectId: "phone-otp-fd564",
  storageBucket: "phone-otp-fd564.appspot.com",
  messagingSenderId: "976144626567",
  appId: "1:976144626567:web:7a9bfb93176ffe20de1922",
  measurementId: "G-QY4GSLKS0J"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);