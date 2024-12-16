import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSL3uz2GceT-d8Q7ajlsS91mW2UNeS83o",
  authDomain: "socialfy-ff817.firebaseapp.com",
  projectId: "socialfy-ff817",
  storageBucket: "socialfy-ff817.firebasestorage.app",
  messagingSenderId: "889807161836",
  appId: "1:889807161836:web:b17a8f930b2a8afaf298c9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)
const db = getFirestore(app)

export { app, auth, storage, db };
