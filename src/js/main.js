"use strict";

// Constantes y variables

let products = [];

const productsList = document.querySelector(".js_productsList");

productsList.innerHTML = products;

// Eventos

// Funciones

fetch("https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json")
  .then((res) => res.json())
  .then((data) => {
    for (let item of data) {
    productsList.innerHTML += `
    <li>
      <img src="${item.image}"></img>
      <p>${item.title}</p>
      <p>${item.price} €</p>
      <button class="purchaseBtn">Comprar</button>
    </li>
    `;
    }
  });
