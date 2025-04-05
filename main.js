// main.js
import {
  collection,
  getDocs,
  query,
  where,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const db = window.db;

const loginForm = document.getElementById("login-form");
const mainContent = document.getElementById("main-content");
const adminButtonArea = document.getElementById("admin-button-area");
const logoutBtn = document.getElementById("logout-btn");

// Automatischer Login bei vorhandenen Daten im localStorage
const savedUser = JSON.parse(localStorage.getItem("user"));
if (savedUser) {
  loginForm.classList.add("hidden");
  logoutBtn?.classList.remove("hidden");
  mainContent?.classList.remove("hidden");

  if (savedUser.isAdmin) {
    const btn = document.createElement("a");
    btn.href = "admin.html";
    btn.innerHTML = '<button class="bg-gray-800 text-white px-4 py-2 rounded-md">Adminbereich</button>';
    adminButtonArea.classList.remove("hidden");
    adminButtonArea.appendChild(btn);
  }

  if (typeof loadProducts === "function") loadProducts();
}

loginForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    where("password", "==", password)
  );
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const userData = snapshot.docs[0].data();

    // Speichere Login-Daten im localStorage
    localStorage.setItem("user", JSON.stringify({
      username: username,
      isAdmin: userData.isAdmin || false
    }));

    location.reload(); // Reload zum Aktualisieren der Sicht
  } else {
    alert("Login fehlgeschlagen");
  }
});

// Logout
logoutBtn?.addEventListener("click", () => {
  localStorage.removeItem("user");
  location.reload();
});

// Produktanzeige & Bestellung (optional, wenn auf der Seite vorhanden)
async function loadProducts() {
  const productList = document.getElementById("product-list");
  const select = document.getElementById("selected-product");
  if (!productList || !select) return;

  const querySnapshot = await getDocs(collection(db, "products"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow-md p-4";
    card.innerHTML = `
      <img src="${data.imageUrl}" alt="${data.name}" class="w-full h-40 object-cover rounded-md mb-2">
      <h4 class="text-lg font-semibold">${data.name}</h4>
      <p class="text-sm text-gray-600">${data.price}€</p>
    `;
    productList.appendChild(card);

    const option = document.createElement("option");
    option.value = doc.id;
    option.textContent = data.name;
    select.appendChild(option);
  });
}

document.getElementById("order-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const productId = document.getElementById("selected-product").value;

  await addDoc(collection(db, "orders"), {
    name,
    phone,
    productId,
    createdAt: new Date().toISOString(),
  });
  alert("Bestellung gesendet!");
});
