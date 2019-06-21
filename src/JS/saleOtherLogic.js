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
let reaminingAmount;
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
    punit.value = product.sale_price;
    const productDescription = product.idProduct + " - " + product.name_product + " - " + product.descriptionProduct
    punit.value = product.sale_price;
    productDescriptionInHtml.innerText = productDescriptionInHtml.innerText + " " + productDescription;
    productQuantityInHtml.innerHTML = productQuantityInHtml.innerText + " " + product.reaminingAmount;
    reaminingAmount = product.reaminingAmount;
});

form.addEventListener('submit', async event => {
    event.preventDefault();
    let cant = document.getElementById("cant").value;

    cant = parseFloat(cant);
    product.quantity = cant;
    product.total_cost = cant * parseFloat(punit.value);
    product.typeProduct = await getCurrent();
    
    if((parseFloat(reaminingAmount).toFixed(2) - parseFloat(product.quantity).toFixed(2)) > 0 ) {
        await shoppingCartController.addNewProductToShoppingCart(product);    
        ipcRenderer.send('product:new', product);
    }
    else {
        console.log("no se pudo agregar");
    }
    
    
});

