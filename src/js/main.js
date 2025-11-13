"use strict";

// Constantes y variables

// Arrays primeramente vacíos del listado de productos y del carrito
let allProducts = [];
let cartProducts = [];

// Uso del querySelector para utilizar elementos del html
const productsList = document.querySelector(".js_productsList");
const notFoundSpan = document.querySelector(".js_notFoundSpan");

const searchBtn = document.querySelector(".js_searchBtn");
const inputContent = document.querySelector(".js_inputContent");

const shoppingCart = document.querySelector(".js_shoppingCart");

// Funciones
// Función para pintar cada uno de los productos en el listado de productos populares
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

// Función para añadir un producto al carrito de compra
function addProductCart(productId) {
  const productSelected = allProducts.find((product) => {
    return product.id === parseInt(productId);
  });
  cartProducts.push(productSelected);

  shoppingCart.innerHTML = renderProducts(cartProducts);
}

// Función para quitar un producto del carrito de compra
function removeProductCart(productId) {
  const cartIndex = cartProducts.findIndex(
    (product) => product.id === parseInt(productId)
  );

  if (cartIndex !== -1) {
    cartProducts.splice(cartIndex, 1);
  }

  shoppingCart.innerHTML = renderProducts(cartProducts);
}

// Función para actualizar el localStorage cada vez que añadimos o quitamos un producto en el carrito
function updateLocalStorage() {
  localStorage.setItem("cartLocal", JSON.stringify(cartProducts));
  localStorage.setItem("productsHtmlLocal", productsList.innerHTML);
}

// Petición al servidor
// Petición a la API, teniendo en cuenta si aún no se han recogido los datos del localStorage. 
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
// Una vez recogidos y guardados en el localStorage, al cargar la página, ya no necesita pedir los datos a la API.
} else {
  allProducts = JSON.parse(localStorage.getItem("allProducts"));
  productsList.innerHTML = localStorage.getItem("productsHtmlLocal");
}

// Si el carrito no está vacío, los productos se guartdan en el localStorage y se recuperan al cargar la página
if (localStorage.getItem("cartLocal") !== null) {
  cartProducts = JSON.parse(localStorage.getItem("cartLocal"));
  shoppingCart.innerHTML = renderProducts(cartProducts);
}

// Eventos
// Un evento click en el botón buscar para filtrar (sin tener en cuenta mayus o minus) los 
// productos que queramos pintar en los productos populares.
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
// Pinta el listado con los productos filtrados
  productsList.innerHTML = renderProducts(foundProducts);
// Aparece un mensaje que indica que no se han encontrado los productos buscados
  if (results === 0) {
    notFoundSpan.classList.remove("hidden");
  }

  inputContent.value = "";
  inputContent.placeholder = "Results: " + results;
});
// Un evento click en el listado de los productos para que, utilizando el botón comprar en cada uno de ellos,
// se añada el producto al carro. En el listado, cada producto seleccionado para comprar 
// aparece con un color de fondo y el botón cambiará a eliminar.
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
    addProductCart(productElement.id);
    updateLocalStorage();
// Lo mismo para quitarlos del carro y que vuelva a aparecer el botón comprar y el fondo original.
  } else if (clickedElement.classList.contains("deleteBtn")) {
    const productElement = clickedElement.parentNode;
    const purchaseBtn = clickedElement;
    purchaseBtn.classList.remove("deleteBtn");
    purchaseBtn.classList.add("purchaseBtn");
    purchaseBtn.textContent = "Buy";
    productElement.classList.remove("productSelected");
    removeProductCart(productElement.id);
    updateLocalStorage();
  }
});
