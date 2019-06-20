const { ipcRenderer } = require('electron');
const form = document.querySelector('form');
const path = require('path');
const fs = require('fs');
const ProductsController = require('../JS/ProductsController');
const productsController = new ProductsController();
const CurrentProductController = require("../JS/CurrentProductController")
const currentProductController = new CurrentProductController();
const ipc = require('electron').ipcRenderer;

let idProduct = document.getElementById("idProduct");
let descriptionProduct = document.getElementById("descriptionProduct");
let quantity = document.getElementById("quantity");
let purchasePrice = document.getElementById("purchasePrice");

let nameProduct = document.getElementById("nameProduct");
let provider = document.getElementById("provider");
let quantitySold = document.getElementById("quantitySold");
let salePrice = document.getElementById("salePrice");

let editingProduct;
var serializeArray = function (form) {
        var serialized = [];
        for (var i = 0; i < form.elements.length; i++) {
            var field = form.elements[i];
            // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
            if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
    
            // Convert field data to a query string
            else if ((field.type !== 'checkbox' && field.type !== 'radio' && field.type !== 'select') || field.checked) {
                serialized.push(field.value);
            }
        }
        return serialized;
};

form.addEventListener('submit', async event => {
    event.preventDefault();
    formValues = serializeArray(form);
    let unitTypeFromHtml;
    if(currentProductController.getCurrentProduct() == "ironmongery")
        unitTypeFromHtml = document.getElementById("unity");
    else {
        unitTypeFromHtml = currentProductController.getCurrentProduct();
    }
    const newProduct = {
        idProduct: formValues[0],
        descriptionProduct: formValues[1],
        quantity: formValues[2],
        purchase_price: formValues[3],
        purchased_total: formValues[2] * formValues[3],

        name_product: formValues[4],
        provider: formValues[5],
        quantity_sold: formValues[6],
        sale_price: formValues[7],
        total_sold: formValues[6] * formValues[7],
        reaminingAmount: formValues[2] - formValues[6],
        unitType: unitTypeFromHtml.value
    };
    let currentProduct = await currentProductController.getCurrentProduct();
    
    if(editingProduct) {
        productsController.updateProduct(editingProduct, newProduct, currentProduct);    
    }
    else {
        productsController.saveProduct(newProduct, currentProduct);
    }
    
    ipcRenderer.send('product:new', newProduct);
});

async function chargeCss() {
    let link = document.createElement('link');
    const pathCss = path.resolve(__dirname, '..', 'CSS', 'woodForm.css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', pathCss);
    document.head.appendChild(link);
}
chargeCss();


ipc.on('message', function(event, message){
    editingProduct = message;
    idProduct.value = message.idProduct;
    descriptionProduct.value = message.descriptionProduct;
    quantity.value = message.quantity;
    purchasePrice.value = message.purchase_price;
    
    nameProduct.value = message.name_product
    provider.value = message.provider;
    quantitySold.value = message.quantity_sold;
    salePrice.value = message.sale_price;
});