// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDO5zb1m2xpZl5YwcOhhRdYXsXY0CGo820",
  authDomain: "carbonozero-db7dd.firebaseapp.com",
  projectId: "carbonozero-db7dd",
  storageBucket: "carbonozero-db7dd.appspot.com",
//   messagingSenderId: "your-messaging-sender-id", 
  appId: "1:465890776683:android:a30a608df932f84994832e",
//   measurementId: "your-measurement-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);


