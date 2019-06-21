const ipc = require('electron').ipcRenderer;
const { ipcRenderer } = require('electron');
const CurrentProductController = require("../JS/CurrentProductController")
const currentProductController = new CurrentProductController();
const ShoppingCartController = require('../JS/ShoppingCartController');
const shoppingCartController = new ShoppingCartController();

const currentProduct = getCurrent();
const punit = document.getElementById("punit");
const productDescriptionInHtml = document.getElementById("product-description");
const productQuantityInHtml = document.getElementById("product-quantity");
const requestQuantity= document.getElementById("request-amount");
let reaminingAmount;
let product;

let currentAmount = 0;
const espesorElement = document.getElementById("espesor");
const anchoElement = document.getElementById("ancho");
const largoElement = document.getElementById("largo");

espesorElement.value = 0.00;
anchoElement.value = 0.00;
largoElement.value = 0.00;


async function getCurrent(){
    return await currentProductController.getCurrentProduct();
}
async function sendProduct(product) {
    await shoppingCartController.addNewProductToShoppingCart(product);
}
async function getAllCart() {
    return await shoppingCartController.getAllProducts();
}

const form = document.querySelector('form');
ipc.on('message', function(event, message){
    product = message;
    const productDescription = product.idProduct + " - " + product.name_product + " - " + product.descriptionProduct
    punit.value = product.sale_price;
    productDescriptionInHtml.innerText = productDescriptionInHtml.innerText + " " + productDescription;
    productQuantityInHtml.innerHTML = productQuantityInHtml.innerText + " " + product.reaminingAmount + " ft.";
    reaminingAmount = product.reaminingAmount;
});

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    let cant;
    let espesor = document.getElementById("espesor").value;
    let ancho = document.getElementById("ancho").value;
    let largo = document.getElementById("largo").value;

    espesor = parseFloat(espesor)
    ancho = parseFloat(ancho)
    largo = parseFloat(largo)
    cant = (espesor * ancho * largo)/12;
    product.quantity = cant.toFixed(2);
    product.total_cost = parseFloat(((espesor * ancho * largo) / 12 )).toFixed(2) * parseFloat(punit.value).toFixed(2);
    product.total_cost = (product.total_cost).toFixed(2);
    product.typeProduct = await getCurrent();
    
    console.log(parseFloat(product.quantity).toFixed(2));
    console.log(parseFloat(reaminingAmount).toFixed(2));

    if((parseFloat(reaminingAmount).toFixed(2) - parseFloat(product.quantity).toFixed(2)) > 0 ) {
        await shoppingCartController.addNewProductToShoppingCart(product);    
        ipcRenderer.send('product:new', product);
    }
    else {
        console.log("no se pudo agregar");
    }

});

espesorElement.addEventListener("keyup", async event => {
    event.preventDefault();
    currentAmount = (espesorElement.value * anchoElement.value * largoElement.value)/12; 
    requestQuantity.innerHTML = "Cantidad solicitada: " + parseFloat(currentAmount).toFixed(2) + " ft.";
});

anchoElement.addEventListener("keyup", async event => {
    event.preventDefault();
    currentAmount = (espesorElement.value * anchoElement.value * largoElement.value)/12;
    requestQuantity.innerHTML = "Cantidad solicitada: " + parseFloat(currentAmount).toFixed(2) + " ft.";
});

largoElement.addEventListener("keyup", async event => {
    event.preventDefault();
    currentAmount = (espesorElement.value * anchoElement.value * largoElement.value)/12;
    requestQuantity.innerHTML = "Cantidad solicitada: " + parseFloat(currentAmount).toFixed(2) + " ft.";
});