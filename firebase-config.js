// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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


// Initialize Authentication and get a reference to the service
const auth = getAuth(app);

// Export the auth object so other files can import it
export { auth };