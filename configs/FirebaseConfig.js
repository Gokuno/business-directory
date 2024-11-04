// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBCl_e7RkaaNKTtP6p8oUQCZ3yJhM_plFA",
    authDomain: "business-directory-65039.firebaseapp.com",
    projectId: "business-directory-65039",
    storageBucket: "business-directory-65039.firebasestorage.app",
    messagingSenderId: "453790050074",
    appId: "1:453790050074:web:80d2a95e5e240ac758eea3",
    measurementId: "G-GT4KY39NVK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);