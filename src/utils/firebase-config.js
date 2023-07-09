// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0x6TMJRwHpjkimLmBkPPprWoAjTLLhmo",
  authDomain: "giga-chat-project.firebaseapp.com",
  projectId: "giga-chat-project",
  storageBucket: "giga-chat-project.appspot.com",
  messagingSenderId: "45827018911",
  appId: "1:45827018911:web:1132fc13e863d36ef512aa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);
