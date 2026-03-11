// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// 1. Add the Firestore import
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1Uyn4eLFuyiZ1exVaMtgwuhIpqAshrUs",
  authDomain: "projectaruga-631ff.firebaseapp.com",
  projectId: "projectaruga-631ff",
  storageBucket: "projectaruga-631ff.firebasestorage.app",
  messagingSenderId: "273058276744",
  appId: "1:273058276744:web:7e8ac70dc8d7da029e863d",
  measurementId: "G-SLQYZGPY87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication 
const auth = getAuth(app);

// 2. Initialize Firestore Database
const db = getFirestore(app);

// 3. Export BOTH auth and db so your other files can use them
export { auth, db };