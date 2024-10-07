// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3i-zKXAXrt9KQb-XAIJyz3HbcDmtH8L4",
  authDomain: "todo-app-tailwind-13745.firebaseapp.com",
  projectId: "todo-app-tailwind-13745",
  storageBucket: "todo-app-tailwind-13745.appspot.com",
  messagingSenderId: "93295677374",
  appId: "1:93295677374:web:88bf8dd08c27bb73caf3ef",
  measurementId: "G-0QKH4VVYB2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
