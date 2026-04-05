// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxb-JTwcY_bk3h8Q6sPqOFYGbK72z7aiw",
    authDomain: "tripline-870f3.firebaseapp.com",
    projectId: "tripline-870f3",
    storageBucket: "tripline-870f3.firebasestorage.app",
    messagingSenderId: "432235100109",
    appId: "1:432235100109:web:629dd4b36dca5aeba3f684",
    measurementId: "G-7HRZZZ4GV2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
