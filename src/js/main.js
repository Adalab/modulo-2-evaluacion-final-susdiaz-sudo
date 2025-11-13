"use strict"

// Constantes y variables
let allProducts = [];
let cartProducts = [];

const productsList = document.querySelector(".js_productsList");
const notFoundSpan = document.querySelector(".js_notFoundSpan");

const searchBtn = document.querySelector(".js_searchBtn");
const inputContent = document.querySelector(".js_inputContent");

const shoppingCart = document.querySelector(".js_shoppingCart");
const product = document.querySelector(".js_product");

// Funciones

function renderProducts(products) {
  
  let productsHtml = "";
  for(let product of products){
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

// Petición al servidor
fetch(
  "https://raw.githubusercontent.com/Adalab/resources/master/apis/products.json"
)
  .then((res) => res.json())
  .then((data) => {
    allProducts = data;
    productsList.innerHTML = renderProducts(allProducts);
    return data;
  });

function addProductCart(productId) {
  const productSelected = allProducts.find((product) => {
  
    return product.id === parseInt(productId);
  });
  cartProducts.push(productSelected);
  console.log(cartProducts);

   shoppingCart.innerHTML = renderProducts(cartProducts);
}

function removeProductCart(productId) {
  const productSelected = allProducts.find((product) => {
  
    return product.id === parseInt(productId);
  });
  console.log(cartProducts.indexOf(productSelected));
  
  cartProducts.splice(cartProducts.indexOf(productSelected), 1);
  //console.log(cartProducts);
  
   shoppingCart.innerHTML = renderProducts(cartProducts);
}


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
    addProductCart(productElement.id);
  }else if(clickedElement.classList.contains("deleteBtn")){
    const productElement = clickedElement.parentNode;
    const purchaseBtn = clickedElement;
    purchaseBtn.classList.remove("deleteBtn");
    purchaseBtn.classList.add("purchaseBtn");
    purchaseBtn.textContent = "Buy";
    productElement.classList.remove("productSelected");
    removeProductCart(productElement.id);
  }
});
