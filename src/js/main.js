"use strict";

// Constantes y variables
const productsList = document.querySelector(".js_productsList");

const searchBtn = document.querySelector(".js_searchBtn");
const inputContent = document.querySelector(".js_inputContent");
const notFoundSpan = document.querySelector(".js_notFoundSpan");

// Funciones
function renderProduct(product) {
  let productContent = `
    <li id="product${product.id}">
      <img src="${product.image}" alt="${product.title}"></img>
      <p>${product.title}</p>
      <p>${product.price} €</p>
      <button class="purchaseBtn">Comprar</button>
    </li>
    `;
  return productContent;
}

function requestProducts() {
  // Petición al servidor
  return fetch(
    "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json"
  )
    .then((res) => res.json())
    .then((data) => {
      for (let item of data) {
        productsList.innerHTML += renderProduct(item);
      }
      return data;
    });
}

// Eventos
searchBtn.addEventListener("click", (ev) => {
  requestProducts().then((products) => {
    productsList.innerHTML = "";
    notFoundSpan.classList.add("hidden");
    let results = 0;
    for (let product of products) {
      if (
        product.title.toLowerCase().includes(inputContent.value.toLowerCase())
      ) {
        productsList.innerHTML += renderProduct(product);
        results++;
        inputContent.placeholder = "Resultados: " + results;
      }
    }

    if (results === 0) {
      notFoundSpan.classList.remove("hidden");
    }

    inputContent.value = "";
  });
});

// Petición al servidor al cargar la página

requestProducts();
