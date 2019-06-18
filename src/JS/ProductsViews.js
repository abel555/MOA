//const { ipcRenderer } = require('electron');
const fs = require('fs');
const ProductsController = require('../JS/ProductsController');
const productsController = new ProductsController();
const path = require('path');
const CurrentProductController = require("../JS/CurrentProductController")
const currentProductController = new CurrentProductController();
let woodsList;
let calaminasList;
let ironmongeryList;
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

function showModal(id){
    const clicked = document.getElementById(id);
    clicked.classList.toggle("show");
}

async function renderSaleW(target) {
    let courrentProduct = await currentProductController.getCurrentProduct();
    switch(courrentProduct) {
        case 'wood':
            ipcRenderer.send('sales:form', woodsList[target]);
            break;
        case 'calamina':
            ipcRenderer.send('salesN:form', calaminasList[target]);
            break;
        case 'ironmongery':
            ipcRenderer.send('salesN:form', ironmongeryList[target]);
            break;
    }
}

async function chargeListInTable(woodsList){
    const tableBody = document.getElementById("table-body");
    for(i = 0; i < woodsList.length; i++) {
      
        if(woodsList[i].counter)
            continue;
        let content = `
        <tr class="dbl-click">
            <td class="clickable" onclick="showModal(${i})">${woodsList[i].idProduct}</td>
            <td id="dbl-menu" class="dbl-click">${woodsList[i].name_product}</td>
            <div id="${i}" class="dropdown-content">
                <a href="#">Editar</a>
                <a href="#" onclick="renderSaleW(${i})">Agregar a venta</a>
            </div>
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
        woodsList = await getProducList("wood")
        chargeListInTable(woodsList);
        break;
      case 'calamina':
        cleanTable();
        calaminasList = await getProducList("calamina")
        chargeListInTable(calaminasList);
        break;
      case 'ironmongery':
        cleanTable();
        ironmongeryList = await getProducList("ironmongery");
        chargeListInTable(ironmongeryList);
        break;
    }
}
chargeCss();
module.exports = {chargeListByProduct};
window.onclick = function(event) {
    if (!event.target.matches('.clickable')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
}