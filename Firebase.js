// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore}  from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJuopligd6YWc8OeJxdNIERikvvxZxtNk",
  authDomain: "chat-app-2f313.firebaseapp.com",
  databaseURL: "https://chat-app-2f313-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-2f313",
  storageBucket: "chat-app-2f313.appspot.com",
  messagingSenderId: "411488836950",
  appId: "1:411488836950:web:446c0e698a0d3ece5f4af7",
  measurementId: "G-WTB24FT8WM"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();


export  { auth , db }; 