"use strict";

// Constantes y variables

let allProducts = [];
let cartProducts = [];

const productsList = document.querySelector(".js_productsList");
const notFoundSpan = document.querySelector(".js_notFoundSpan");

const searchBtn = document.querySelector(".js_searchBtn");
const inputContent = document.querySelector(".js_inputContent");

const shoppingCart = document.querySelector(".js_shoppingCart");

// Funciones

function renderProducts(products) {
  let productsHtml = "";
  for (let product of products) {
    productsHtml += `
    <li class="js_product" id="${product.id}">
      <img src="${product.image}" alt="${product.title}"></img>
      <p>${product.title}</p>
      <p>${product.price} €</p>
      <button class="purchaseBtn js_purchaseBtn">Buy</button>
    </li>
    `;
  }
  return productsHtml;
}

function addProductCart(productId) {
  const productSelected = allProducts.find((product) => {
    return product.id === parseInt(productId);
  });
  cartProducts.push(productSelected);
  refreshLocalStorage();

  shoppingCart.innerHTML = renderProducts(cartProducts);
}

function removeProductCart(productId) {
  const cartIndex = cartProducts.findIndex(
    (product) => product.id === parseInt(productId)
  );

  if (cartIndex !== -1) {
    cartProducts.splice(cartIndex, 1);
    refreshLocalStorage();
  }

  shoppingCart.innerHTML = renderProducts(cartProducts);
}

function refreshLocalStorage() {
  localStorage.removeItem("cartLocal");
  localStorage.removeItem("productsHtmlLocal");

  localStorage.setItem("cartLocal", JSON.stringify(cartProducts));
  localStorage.setItem("productsHtmlLocal", productsList.innerHTML);
}

// Petición al servidor

if (localStorage.getItem("productsHtmlLocal") === null) {
  fetch(
    "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json"
  )
    .then((res) => res.json())
    .then((data) => {
      allProducts = data;
      productsList.innerHTML = renderProducts(allProducts);
      localStorage.setItem("allProducts", JSON.stringify(allProducts));
      localStorage.setItem("productsHtmlLocal", productsList.innerHTML);
    });
} else {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  productsList.innerHTML = localStorage.getItem("productsHtmlLocal");
}

if (localStorage.getItem("cartLocal") !== null) {
  cartProducts = JSON.parse(localStorage.getItem("cartLocal"));
  shoppingCart.innerHTML = renderProducts(cartProducts);
}

// Eventos

searchBtn.addEventListener("click", (ev) => {
  productsList.innerHTML = "";
  notFoundSpan.classList.add("hidden");
  let foundProducts = [];
  let results = 0;
  for (let product of allProducts) {
    if (
      product.title.toLowerCase().includes(inputContent.value.toLowerCase())
    ) {
      foundProducts.push(product);
      results++;
      inputContent.placeholder = "Results: " + results;
    }
  }

  productsList.innerHTML = renderProducts(foundProducts);

  if (results === 0) {
    notFoundSpan.classList.remove("hidden");
  }

  inputContent.value = "";
  inputContent.placeholder = "Results: " + results;
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
    refreshLocalStorage();
    addProductCart(productElement.id);
  } else if (clickedElement.classList.contains("deleteBtn")) {
    const productElement = clickedElement.parentNode;
    const purchaseBtn = clickedElement;
    purchaseBtn.classList.remove("deleteBtn");
    purchaseBtn.classList.add("purchaseBtn");
    purchaseBtn.textContent = "Buy";
    productElement.classList.remove("productSelected");
    refreshLocalStorage();
    removeProductCart(productElement.id);
  }
});
