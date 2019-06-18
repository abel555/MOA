const { ipcRenderer } = require('electron');
const form = document.querySelector('form');
const path = require('path');
const fs = require('fs');
const ProductsController = require('../JS/ProductsController');
const productsController = new ProductsController();
const CurrentProductController = require("../JS/CurrentProductController")
const currentProductController = new CurrentProductController();
var serializeArray = function (form) {
        var serialized = [];
        for (var i = 0; i < form.elements.length; i++) {
            var field = form.elements[i];
            // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
            if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
    
            // Convert field data to a query string
            else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
                serialized.push(field.value);
            }
        }
        return serialized;
};

form.addEventListener('submit', async event => {
    event.preventDefault();
    formValues = serializeArray(form);
    console.log(formValues);
    const newProduct = {
        idProduct: formValues[0],
        descriptionProduct: formValues[1],
        quantity: formValues[2],
        purchase_price: formValues[3],
        purchased_total: formValues[4],

        name_product: formValues[5],
        provider: formValues[6],
        quantity_sold: formValues[7],
        sale_price: formValues[8],
        total_sold: formValues[9],
        reaminingAmount: formValues[4] - formValues[9]
    };
    let currentProduct = await currentProductController.getCurrentProduct();
    productsController.saveProduct(newProduct, currentProduct);
    ipcRenderer.send('product:new', newProduct);
});
async function chargeCss() {
    let link = document.createElement('link');
    const pathCss = path.resolve(__dirname, '..', 'CSS', 'woodForm.css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', pathCss);
    document.head.appendChild(link);
    //document.querySelector(".title").innerHTML = "Formulario de madera";
}
chargeCss();


ipcRenderer.on('store-data', function (event,store) {
    console.log(store);
});