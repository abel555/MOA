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

let product;

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
    productQuantityInHtml.innerHTML = productQuantityInHtml.innerText + " " + product.reaminingAmount;
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
    cant = espesor * ancho * largo;
    product.quantity = cant;
    product.total_cost = ((espesor * ancho * largo) / 12 ) * parseFloat(punit.value);
    product.total_cost = (product.total_cost).toFixed(2);
    product.typeProduct = await getCurrent();
    
    await shoppingCartController.addNewProductToShoppingCart(product);
   
    ipcRenderer.send('product:new', product);
});

