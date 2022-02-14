// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuEbdM329EKKlOfEnCh7uiGM-iFfL8Cjw",
  authDomain: "my-shop-11ad7.firebaseapp.com",
  projectId: "my-shop-11ad7",
  storageBucket: "my-shop-11ad7.appspot.com",
  messagingSenderId: "132769733188",
  appId: "1:132769733188:web:cdcea36e23cf03632a3a11",
  measurementId: "G-7V8V56Q6HV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
