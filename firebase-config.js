// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDiRgzIkczQYJFj9Sp7vCcHybCrZydYlhA",
  authDomain: "pbauto-bf07c.firebaseapp.com",
  projectId: "pbauto-bf07c",
  storageBucket: "pbauto-bf07c.appspot.com", // <- kleiner Fehler hier behoben!
  messagingSenderId: "491118168248",
  appId: "1:491118168248:web:cbdb5e37cc19ca2b65cc4d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
window.db = db;
