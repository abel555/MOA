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
    console.log(form);
    let unitTypeFromHtml;
    if(currentProductController.getCurrentProduct() == "ironmongery")
        unitTypeFromHtml = document.getElementById("unity");
    else {
        unitTypeFromHtml = currentProductController.getCurrentProduct();
    }
    const newProduct = {
        idProduct: formValues[0],
        descriptionProduct: formValues[1],
        quantity: parseFloat(formValues[2]).toFixed(2),
        purchase_price: parseFloat(formValues[3]),
        purchased_total: (parseFloat(formValues[2]) * parseFloat(formValues[3])).toFixed(2),

        name_product: formValues[4],
        provider: formValues[5],
        quantity_sold: parseFloat(formValues[6]).toFixed(2),
        sale_price: parseFloat(formValues[7]),
        total_sold: (parseFloat(formValues[7]) * parseFloat(formValues[6])).toFixed(2),
        reaminingAmount: (parseFloat(formValues[2]) - parseFloat(formValues[6])).toFixed(2),
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