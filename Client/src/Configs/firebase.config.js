import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQJze9nv991SUDbFFLlws",
  authDomain: "AIzaSyAQJze9nv991SUDbFFLlws",
  projectId: "AIzaSyAQJze9nv991SUDbFFLlws",
  storageBucket: "AIzaSyAQJze9nv991SUDbFFLlws",
  messagingSenderId: "AIzaSyAQJze9nv991SUDbFFLlws",
  appId: "AIzaSyAQJze9nv991SUDbFFLlws",
  measurementId: "AIzaSyAQJze9nv991SUDbFFLlws"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);