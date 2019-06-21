const { ipcRenderer } = require('electron');
const addNewWoodButton = document.querySelector('#addNewWood');
const addNewCalaminaButton = document.querySelector('#addNewCalamina');
const addNewIronmongeryButton = document.querySelector('#addNewIronmongery');
const headButton = document.querySelector("#saleConfirmation");
const returnShoppingCart = document.querySelector('#returnShoppingcart');
// const ShoppingCartController = require("./ShoppingCartController");

const shoppingCartController = new ShoppingCartController();
headButton.addEventListener('click', event => {
    event.preventDefault();
    ipcRenderer.send('head:form');
});

addNewWoodButton.addEventListener('click', event => {
    event.preventDefault();
    ipcRenderer.send('product:form');
});

addNewCalaminaButton.addEventListener('click', event => {
    event.preventDefault();
    ipcRenderer.send('calamina:form');
});

addNewIronmongeryButton.addEventListener('click', event => {
    event.preventDefault();
    ipcRenderer.send('ironmongery:form');
});

returnShoppingCart.addEventListener('click', event => {
    event.preventDefault();
    shoppingCartController.returnShoppingCart();
    location.reload();
});