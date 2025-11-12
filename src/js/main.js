"use strict";

// Constantes y variables
let allProducts = [];
const productsList = document.querySelector(".js_productsList");

const searchBtn = document.querySelector(".js_searchBtn");
const inputContent = document.querySelector(".js_inputContent");
const notFoundSpan = document.querySelector(".js_notFoundSpan");

const shoppingCart = document.querySelector(".js_shoppingCart");
const product = document.querySelector(".js_product");

// Funciones

function renderProduct(product) {
  return `
    <li class="js_product" id="product${product.id}">
      <img src="${product.image}" alt="${product.title}"></img>
      <p>${product.title}</p>
      <p>${product.price} €</p>
      <button class="purchaseBtn js_purchaseBtn">Buy</button>
    </li>
    `;
}

// Petición al servidor
fetch(
  "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json"
)
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    for (let item of data) {
      productsList.innerHTML += renderProduct(item);
    }
    return data;
  });

// Eventos

searchBtn.addEventListener("click", (ev) => {
  productsList.innerHTML = "";
  notFoundSpan.classList.add("hidden");
  let results = 0;
  for (let product of allProducts) {
    if (
      product.title.toLowerCase().includes(inputContent.value.toLowerCase())
    ) {
      productsList.innerHTML += renderProduct(product);
      results++;
      inputContent.placeholder = "Results: " + results;
    }
  }

  if (results === 0) {
    notFoundSpan.classList.remove("hidden");
  }

  inputContent.value = "";
});

productsList.addEventListener("click", (ev) => {
  ev.preventDefault();
  const clickedElement = ev.target;
  if (clickedElement.classList.contains("purchaseBtn")) {
    const productElement = clickedElement.parentNode;
    const purchaseBtn = clickedElement;
    purchaseBtn.classList.add("deleteBtn");
    purchaseBtn.classList.remove("purchaseBtn");
    purchaseBtn.textContent = "Remove";
    productElement.classList.add("productSelected");
  }else if(clickedElement.classList.contains("deleteBtn")){
    const productElement = clickedElement.parentNode;
    const purchaseBtn = clickedElement;
    purchaseBtn.classList.remove("deleteBtn");
    purchaseBtn.classList.add("purchaseBtn");
    purchaseBtn.textContent = "Buy";
    productElement.classList.remove("productSelected");
  }
});

