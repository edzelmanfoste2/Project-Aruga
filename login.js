import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

let attempts = 0;
let maxAttempts = 3;
let lockSeconds = 300;
let locked = false;

const form = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");

form.addEventListener("submit", function(e){
e.preventDefault();

if(locked){
showNotification("⚠ Login temporarily locked. Please wait.", "error");
return;
}

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

const email = username + "@cswdo-binan.com";

signInWithEmailAndPassword(auth,email,password)

.then((userCredential)=>{

attempts = 0;

showNotification("✅ Login Successful!", "success");

setTimeout(()=>{
window.location.href="table.html";
},1500);

})

.catch((error)=>{

attempts++;

let remaining = maxAttempts - attempts;

if(remaining > 0){

showNotification("❌ Wrong password. Attempts remaining: " + remaining,"error");

}else{

lockLogin();

}

});

});


function lockLogin(){

locked = true;

let countdown = lockSeconds;

loginBtn.disabled = true;

loginBtn.innerText = "Locked (" + countdown + "s)";

showNotification("🔒 Too many failed attempts. Login locked.","error");

const timer = setInterval(()=>{

countdown--;

loginBtn.innerText = "Locked (" + countdown + "s)";

if(countdown <= 0){

clearInterval(timer);

locked = false;

attempts = 0;

loginBtn.disabled = false;

loginBtn.innerText = "Login";

showNotification("✅ You can try logging in again.","success");

}

},1000);

}


function showNotification(message,type){

const notif = document.createElement("div");

notif.innerText = message;

notif.style.position = "fixed";
notif.style.top = "20px";
notif.style.right = "20px";
notif.style.padding = "12px 20px";
notif.style.borderRadius = "6px";
notif.style.color = "white";
notif.style.fontWeight = "bold";
notif.style.zIndex = "9999";
notif.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
notif.style.fontSize = "14px";

if(type==="error"){
notif.style.background = "#e74c3c";
}

if(type==="success"){
notif.style.background = "#2ecc71";
}

document.body.appendChild(notif);

setTimeout(()=>{
notif.remove();
},3000);

}