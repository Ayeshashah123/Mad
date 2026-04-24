import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3HtteYuOkKNZeUaRJdY0ihyBTxWqOQuU",
  authDomain: "madproject-ea265.firebaseapp.com",
  projectId: "madproject-ea265",
  storageBucket: "madproject-ea265.firebasestorage.app",
  messagingSenderId: "639950345659",
  appId: "1:639950345659:web:d0b7920ed6b298701e609e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);