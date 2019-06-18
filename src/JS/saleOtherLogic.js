const ipc = require('electron').ipcRenderer;
const { ipcRenderer } = require('electron');
const CurrentProductController = require("../JS/CurrentProductController")
const currentProductController = new CurrentProductController();
const currentProduct = getCurrent();
const punit = document.getElementById("punit");
let product;
async function getCurrent(){
    return await currentProductController.getCurrentProduct();
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
    product.total_sold = cant * parseFloat(punit.value);
    product.type = currentProduct;
    console.log(product);
    //ipcRenderer.send('product:new', product);
   

});

