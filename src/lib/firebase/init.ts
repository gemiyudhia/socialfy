// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSL3uz2GceT-d8Q7ajlsS91mW2UNeS83o",
  authDomain: "socialfy-ff817.firebaseapp.com",
  projectId: "socialfy-ff817",
  storageBucket: "socialfy-ff817.firebasestorage.app",
  messagingSenderId: "889807161836",
  appId: "1:889807161836:web:b17a8f930b2a8afaf298c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
