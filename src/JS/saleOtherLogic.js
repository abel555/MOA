const ipc = require('electron').ipcRenderer;
const { ipcRenderer } = require('electron');
const CurrentProductController = require("../JS/CurrentProductController")
const currentProductController = new CurrentProductController();
const ShoppingCartController = require('../JS/ShoppingCartController');
const shoppingCartController = new ShoppingCartController();
const currentProduct = getCurrent();
const punit = document.getElementById("punit");
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
    console.log(message); // logs out "Hello second window!"
    product = message;
    
    punit.value = product.sale_price;
});

form.addEventListener('submit', async event => {
    event.preventDefault();
    let cant = document.getElementById("cant").value;


    cant = parseFloat(cant)
    product.quantity = cant;
    product.total_cost = cant * parseFloat(punit.value);
    product.typeProduct = await getCurrent();
    await shoppingCartController.addNewProductToShoppingCart(product);
    // console.log(await shoppingCartController.getAllProducts());
    ipcRenderer.send('product:new', product);
   

});

