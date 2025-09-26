import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCP9iJ-Yps-1YQng7DCaWuHMas5aOPSidA",
  authDomain: "chatapp-firebase-1fb76.firebaseapp.com",
  databaseURL: "https://chatapp-firebase-1fb76-default-rtdb.firebaseio.com",
  projectId: "chatapp-firebase-1fb76",
  storageBucket: "chatapp-firebase-1fb76.appspot.com",
  messagingSenderId: "630915596265",
  appId: "1:630915596265:web:685d3ec08ebf89f2d05578"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM Elements
const wrapper = document.querySelector(".wrapper");
const loginForm = wrapper.querySelector(".login form");
const registerForm = wrapper.querySelector(".register form");
const loginLink = wrapper.querySelector(".login-link");
const registerLink = wrapper.querySelector(".register-link");

// Switch forms
registerLink.addEventListener("click", () => wrapper.classList.add("active"));
loginLink.addEventListener("click", () => wrapper.classList.remove("active"));

// Hash function (SHA-256)
async function hashPassword(password) {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Registration
registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = registerForm.querySelector('input[type="text"]').value;
  const email = registerForm.querySelector('input[type="email"]').value;
  const password = registerForm.querySelector('input[type="password"]').value;
  const hashedPassword = await hashPassword(password);

  set(ref(database, "users/" + username), { username, email, password: hashedPassword })
    .then(() => {
      alert("Registration successful!");
      registerForm.reset();
      wrapper.classList.remove("active"); // switch to login
    })
    .catch((err) => {
      console.error(err);
      alert("Registration failed!");
    });
});

// Login
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = loginForm.querySelector('input[type="text"]').value;
  const password = loginForm.querySelector('input[type="password"]').value;
  const hashedPassword = await hashPassword(password);

  const dbRef = ref(database);
  get(child(dbRef, `users/${username}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val().password === hashedPassword) {
          alert("Login successful!");
          loginForm.reset();
        } else {
          alert("Incorrect password!");
        }
      } else {
        alert("User not found!");
      }
    })
    .catch((error) => {
      console.error(error);
      alert("Login failed!");
    });
});
