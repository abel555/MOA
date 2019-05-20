const { ipcRenderer } = require('electron');
const form = document.querySelector('form');
const path = require('path');
const fs = require('fs');
const jsonFilename = path.resolve(__dirname, '..', 'data', 'WOODS_DETAILS.json');

function getWoodListFromJsonFile() {
    let woodsJSON = fs.readFileSync(jsonFilename);
    let woodList = JSON.parse(woodsJSON);
    return woodList;
}

function saveInJson(newProduct) {
    let woodList = getWoodListFromJsonFile();
    woodList.push(newProduct);
    let newProductToJson = JSON.stringify(woodList, null, 2);
    
    fs.writeFile(jsonFilename, newProductToJson, finished);
    
    function finished(err) {
        console.log(err);
    }
}
form.addEventListener('submit', event => {
    
    event.preventDefault();
    
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
        reaminingAmount: reaminingAmount
    };
    // saveInJson(newProduct);
    ipcRenderer.send('product:new', newProduct);
});