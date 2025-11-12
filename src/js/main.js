"use strict";

// Constantes y variables
const productsList = document.querySelector(".js_productsList");

const searchBtn = document.querySelector(".js_searchBtn");
const inputContent = document.querySelector(".js_inputContent");
const notFoundSpan = document.querySelector(".js_notFoundSpan");

const purchaseBtn = document.querySelector(".js_purchaseBtn");
const deleteBtn = document.querySelector(".js_deleteBtn");
const shoppingCart = document.querySelector(".js_shoppingCart");
const product = document.querySelector(".js_product");

// Funciones

function renderProduct(product) {
  let productContent = `
    <li class="js_product" id="product${product.id}">
      <img src="${product.image}" alt="${product.title}"></img>
      <p>${product.title}</p>
      <p>${product.price} €</p>
      <button class="purchaseBtn js_purchaseBtn">Comprar</button>
      <button class="deleteBtn js_deleteBtn hidden">Eliminar</button>
    </li>
    `;
  return productContent;
}

// Petición al servidor

function requestProducts() {
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

requestProducts();

purchaseBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  console.log("Has hecho click en el botón comprar");
  shoppingCart.innerHTML += renderProduct(product);
  purchaseBtn.classList.add("hidden");
  deleteBtn.classList.remove("hidden");
  productContent.classList.add("productSelect");
});
