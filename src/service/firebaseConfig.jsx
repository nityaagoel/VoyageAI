// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe413oi4oYshGOQF8M_FfZgVNAGaUBKE4",
  authDomain: "trip-planner-331dd.firebaseapp.com",
  projectId: "trip-planner-331dd",
  storageBucket: "trip-planner-331dd.firebasestorage.app",
  messagingSenderId: "596601417225",
  appId: "1:596601417225:web:643cdd7ec3ea5b75b912d8",
  measurementId: "G-2EVLTGMZR4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// const analytics = getAnalytics(app);
