import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebase-config.js"; 

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    // Explicitly grab the values using the new IDs
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    
    // Create the dummy email
    const dummyEmail = username + "@cswdo-binan.com";

    console.log("Attempting login with:", dummyEmail); // Just to verify it looks right in the console

    signInWithEmailAndPassword(auth, dummyEmail, password)
        .then(() => {
            console.log("Success!");
            window.location.href = "table.html"; 
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert("Login failed: " + error.message);
        });
});