// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU6fWwDAtgFYDaQOUkejYg_2CyMjH_hjw",
  authDomain: "ecommfinal-2cbb1.firebaseapp.com",
  projectId: "ecommfinal-2cbb1",
  storageBucket: "ecommfinal-2cbb1.appspot.com",
  messagingSenderId: "617100348484",
  appId: "1:617100348484:web:ebd77a97c1b75ce9590011",
  databaseURL: "https://ecommfinal-2cbb1-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;