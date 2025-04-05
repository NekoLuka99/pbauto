<!-- firebase-config.js -->
<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "DEIN_API_KEY",
    authDomain: "DEIN_PROJEKT.firebaseapp.com",
    projectId: "DEIN_PROJEKT",
    storageBucket: "DEIN_PROJEKT.appspot.com",
    messagingSenderId: "...",
    appId: "..."
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
