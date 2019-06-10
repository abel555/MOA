const { ipcRenderer } = require('electron');
const form = document.querySelector('form');
const path = require('path');
const fs = require('fs');
const jsonFilename = path.resolve(__dirname, '..', 'data', 'WOODS_DETAILS');

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'data/WOODS_DETAILS', autoload: true });

async function chargeCss() {
    let link = document.createElement('link');
    const pathCss = path.resolve(__dirname, '..', 'CSS', 'woodForm.css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', pathCss);
    document.head.appendChild(link);
    document.querySelector(".title").innerHTML = "Formulario de madera";
}

function get_id() {
    return new Promise((resolve, reject) =>{
      db.find({ flag: 'counter' }, function (err, docs) {
          resolve(docs);
      });
    })
}

function updateCounter(array) {
    let numReplaced = 1;
    numReplaced = Number(numReplaced);
    db.update({ flag: 'counter', counter: (array[0].counter-1).toString() }, 
        {flag: 'counter', counter: (array[0].counter).toString()}, 
        {}, 
        function (err, numReplaced) {
    });      
}

function saveInJson(newProduct) {
    db.insert(newProduct);
}

form.addEventListener('submit', async event => {
    event.preventDefault();
    
    let currentCounter = await get_id();
    
    
    const idProduct = document.querySelector('#idProduct').value;
    const descriptionProduct = document.querySelector('#description').value;
    const quantity = document.querySelector('#quantity').value;
    const purchasePrice = document.querySelector('#purchasePrice').value;
    const purchasedTotal = document.querySelector('#purchasedTotal').value;
    
    const nameProduct = document.querySelector('#name').value;
    const provider = document.querySelector('#provider').value;
    const quantitySold = document.querySelector('#quantitySold').value;
    const salePrice = document.querySelector('#salePrice').value;
    const totalSold = document.querySelector('#totalSold').value;
    const reaminingAmount = purchasedTotal - totalSold;
    const newProduct = {
        idProduct: idProduct,
        descriptionProduct: descriptionProduct,
        quantity: quantity,
        purchase_price: purchasePrice,
        purchased_total: purchasedTotal,

        name_product: nameProduct,
        provider: provider,
        quantity_sold: quantitySold,
        sale_price: salePrice,
        total_sold: totalSold,
        reaminingAmount: reaminingAmount,

        _id: currentCounter[0].counter.toString()
    };

    console.log(typeof newProduct)
    saveInJson(newProduct);
    
    currentCounter[0].counter++;
    updateCounter(currentCounter);
    ipcRenderer.send('product:new', newProduct);
});

chargeCss();