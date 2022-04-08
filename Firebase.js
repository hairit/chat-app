// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore}  from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGKD3xMNAkR866cJKlIHTbRFzNe_oXR4Q",
  authDomain: "chat-app-a2064.firebaseapp.com",
  databaseURL: "https://chat-app-a2064-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-a2064",
  storageBucket: "chat-app-a2064.appspot.com",
  messagingSenderId: "673396530006",
  appId: "1:673396530006:web:da07f136254a868685d4f7",
  measurementId: "G-0S53J32J1B"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth();


export  { auth , db }; 