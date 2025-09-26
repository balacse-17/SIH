// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP9iJ-Yps-1YQng7DCaWuHMas5aOPSidA",
  authDomain: "chatapp-firebase-1fb76.firebaseapp.com",
  projectId: "chatapp-firebase-1fb76",
  storageBucket: "chatapp-firebase-1fb76.firebasestorage.app",
  messagingSenderId: "630915596265",
  appId: "1:630915596265:web:685d3ec08ebf89f2d05578",
  measurementId: "G-X7BJQ52K51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;