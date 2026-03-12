import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { auth } from "./firebase-config.js";

const maxAttempts = 5;
const lockSeconds = 10;

const form = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");

// get stored attempts
let attempts = parseInt(localStorage.getItem("loginAttempts")) || 0;

// check lock on page load
checkLock();

form.addEventListener("submit", function(e){
e.preventDefault();

if(isLocked()){
showNotification("⚠ Login locked. Please wait.","error");
return;
}

const username = document.getElementById("username").value.trim();
const password = document.getElementById("password").value;

const email = username + "@cswdo-binan.com";

signInWithEmailAndPassword(auth,email,password)

.then(()=>{

// LOGIN SUCCESS
attempts = 0;

localStorage.removeItem("loginAttempts");
localStorage.removeItem("lockUntil");

showNotification("✅ Login successful","success");

setTimeout(()=>{
window.location.href="table.html";
},1000);

})

.catch(()=>{

// LOGIN FAILED
attempts++;

localStorage.setItem("loginAttempts", attempts);

let remaining = maxAttempts - attempts;

if(attempts >= maxAttempts){
lockLogin();
}else{
showNotification("❌ Wrong password. Attempts remaining: " + remaining,"error");
}

});

});

function lockLogin(){

const lockUntil = Date.now() + lockSeconds * 1000;

localStorage.setItem("lockUntil",lockUntil);

startCountdown(lockUntil);

showNotification("🔒 Too many failed attempts. Locked for 10 seconds.","error");

}

function isLocked(){

const lockUntil = localStorage.getItem("lockUntil");

if(!lockUntil) return false;

return Date.now() < lockUntil;

}

function checkLock(){

const lockUntil = localStorage.getItem("lockUntil");

if(lockUntil && Date.now() < lockUntil){
startCountdown(lockUntil);
}

}

function startCountdown(lockUntil){

loginBtn.disabled = true;

const timer = setInterval(()=>{

let remaining = Math.ceil((lockUntil - Date.now())/1000);

if(remaining <= 0){

clearInterval(timer);

loginBtn.disabled = false;
loginBtn.innerText = "Login";

// RESET EVERYTHING
localStorage.removeItem("lockUntil");
localStorage.removeItem("loginAttempts");
attempts = 0;

showNotification("✅ Login unlocked. You can try again.","success");

}else{

loginBtn.innerText = "Locked (" + remaining + "s)";

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

if(type === "error"){
notif.style.background = "#e74c3c";
}

if(type === "success"){
notif.style.background = "#2ecc71";
}

document.body.appendChild(notif);

setTimeout(()=>{
notif.remove();
},3000);

}