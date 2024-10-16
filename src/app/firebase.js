// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBqUrc6zgXSdsaOyTaIpeoIccrM4paIaRE",
  authDomain: "worldsoul-3f9cf.firebaseapp.com",
  projectId: "worldsoul-3f9cf",
  storageBucket: "worldsoul-3f9cf.appspot.com",
  messagingSenderId: "454391610870",
  appId: "1:454391610870:web:c2f900bffeab592b6ddbd7",
  measurementId: "G-WG6NDS8V7K"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
export { db }; // 변경된 부분
