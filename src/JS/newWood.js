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


    let currentCounter = await get_id();
    
}

function get_id() {
    return new Promise((resolve, reject) =>{
      db.find({ flag: 'counter' }, function (err, docs) {
          resolve(docs);
      });
    })
}

function updateCounter(counter) {
    counter = counter.toString();
    db.update({ flag: 'counter' }, { flag: 'counter', counter}, {}, function (err, ) {
        
    });      
}

function saveInJson(newProduct) {
    db.insert(newProduct);
}

form.addEventListener('submit', event => {
    
    event.preventDefault();
    
    
    let currentCounter;
    
    
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

        _id: "1"
    };

    // saveInJson(newProduct);
    
    currentCounter = Number(currentCounter);
    currentCounter++;
    updateCounter(currentCounter);
    ipcRenderer.send('product:new', newProduct);
});


chargeCss();