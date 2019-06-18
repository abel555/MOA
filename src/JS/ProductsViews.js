const ProductsController = require('../JS/ProductsController');
const productsController = new ProductsController();
const path = require('path');
const CurrentProductController = require("../JS/CurrentProductController")
const currentProductController = new CurrentProductController();

function chargeCss() {
    let link = document.createElement('link');
    const pathCss = path.resolve(__dirname, '..', 'CSS', 'index.css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', pathCss);
    document.head.appendChild(link);
}

async function getProducList(tipe) {
    return await productsController.getAllProducts(tipe);
}

async function chargeListInTable(woodsList){
    const tableBody = document.getElementById("table-body");
    for(i = 0; i < woodsList.length; i++) {
      
        if(woodsList[i].counter)
            continue;
        let content = `
        <tr class="dbl-click">
        <td>${woodsList[i].idProduct}</td>
        <td class="dbl-click">${woodsList[i].name_product}</td>
        <td>${woodsList[i].provider}</td>
        <td>${woodsList[i].descriptionProduct}</td>
        <td>${woodsList[i].quantity}</td>
        <td>${woodsList[i].quantity_sold}</td>
        <td>${woodsList[i].purchase_price}</td>
        <td>${woodsList[i].sale_price}</td>
        <td>${woodsList[i].purchased_total}</td>
        <td>${woodsList[i].total_sold}</td>
        <td>${woodsList[i].reaminingAmount}</td>
        </tr>
        `;
        tableBody.insertAdjacentHTML('beforeEnd',content);
    }
}
function cleanTable() {
    let table = document.querySelector("#table-body");
    while(table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }
}
async function chargeListByProduct() {
    let courrentProduct = await currentProductController.getCurrentProduct();
    switch(courrentProduct) {
      case 'wood':
        cleanTable();
        const woodsList = await getProducList("wood")
        chargeListInTable(woodsList);
        break;
      case 'calamina':
        cleanTable();
        const calaminasList = await getProducList("calamina")
        chargeListInTable(calaminasList);
        break;
      case 'ironmongery':
        cleanTable();
        const ironmongeryList = await getProducList("ironmongery");
        chargeListInTable(ironmongeryList);
        break;
    }
}
chargeCss();
module.exports = {chargeListByProduct};