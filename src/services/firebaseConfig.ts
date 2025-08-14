// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxEf1yI7NY3oR_nZqt303O3QMlyiPocVo",
  authDomain: "projet3hs.firebaseapp.com",
  projectId: "projet3hs",
  storageBucket: "projet3hs.firebasestorage.app",
  messagingSenderId: "716151265395",
  appId: "1:716151265395:web:1afda5c3b0430531d7f206"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp);