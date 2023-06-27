// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkik60FYHNaO7_UDJ1c3LwWJ2O-5fZ3fQ",
  authDomain: "react-library-42e17.firebaseapp.com",
  projectId: "react-library-42e17",
  storageBucket: "react-library-42e17.appspot.com",
  messagingSenderId: "541025487506",
  appId: "1:541025487506:web:b7110806c077ec9bd0f44b",
  measurementId: "G-NMKYEM6TWK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
export const auth =getAuth(app);
export const googleProvider = new GoogleAuthProvider;
export const db = getFirestore(app);