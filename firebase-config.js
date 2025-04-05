<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

  const firebaseConfig = {
  apiKey: "AIzaSyDiRgzIkczQYJFj9Sp7vCcHybCrZydYlhA",
  authDomain: "pbauto-bf07c.firebaseapp.com",
  projectId: "pbauto-bf07c",
  storageBucket: "pbauto-bf07c.firebasestorage.app",
  messagingSenderId: "491118168248",
  appId: "1:491118168248:web:cbdb5e37cc19ca2b65cc4d"
};

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  window.db = db;
</script>

<!-- index.html -->
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Shop</title>
</head>
<body>
  <h1>Produkte</h1>
  <div id="product-list"></div>

  <h2>Bestellung</h2>
  <form id="order-form">
    <input type="text" id="name" placeholder="Name" required />
    <input type="text" id="phone" placeholder="Telefonnummer" required />
    <select id="selected-product"></select>
    <button type="submit">Bestellen</button>
  </form>

  <script type="module" src="firebase-config.js"></script>
  <script type="module">
    import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

    const db = window.db;
    const productList = document.getElementById("product-list");
    const select = document.getElementById("selected-product");

    async function loadProducts() {
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const div = document.createElement("div");
        div.textContent = `${data.name} - ${data.price}€`;
        productList.appendChild(div);

        const option = document.createElement("option");
        option.value = doc.id;
        option.textContent = data.name;
        select.appendChild(option);
      });
    }
    loadProducts();

    document.getElementById("order-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const productId = select.value;

      await addDoc(collection(db, "orders"), {
        name,
        phone,
        productId,
        createdAt: new Date().toISOString()
      });
      alert("Bestellung gesendet!");
    });
  </script>
</body>
</html>
