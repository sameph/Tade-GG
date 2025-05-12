// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tade-gg.firebaseapp.com",
  projectId: "tade-gg",
  storageBucket: "tade-gg.firebasestorage.app",
  messagingSenderId: "542753839332",
  appId: "1:542753839332:web:b48a4a819cf6acb39b74f1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);