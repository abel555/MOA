const fs = require('fs');
const ProductsController = require('../JS/ProductsController');
const productsController = new ProductsController();
const path = require('path');
const CurrentProductController = require("../JS/CurrentProductController")
const currentProductController = new CurrentProductController();
const ShoppingCartController = require("../JS/ShoppingCartController");
const ReceiptController = require("../JS/ReceiptController");

let woodsList;
let calaminasList;
let ironmongeryList;
let receiptList;

function chargeCss() {
    let link = document.createElement('link');
    const pathCss = path.resolve(__dirname, '..', 'CSS', 'index.css');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', pathCss);
    document.head.appendChild(link);
}

async function getShoppingCart(){
    const shoppingCart = new ShoppingCartController();
    return await shoppingCart.getAllProducts();
}

async function getReceipt(){
  const receipt = new ReceiptController();
  return await receipt.getAllReceipts();
}

async function getProducList(tipe) {
    return await productsController.getAllProducts(tipe);
}

function showModal(id){
    const clicked = document.getElementById(id);
    clicked.classList.toggle("show");
}

function showReceipt(id) {
    ipcRenderer.send('preview:pdf', receiptList[id]);
}

async function editProduct(target) {
    let courrentProduct = await currentProductController.getCurrentProduct();
    switch(courrentProduct) {
        case 'wood':
            ipcRenderer.send('wood:edit', woodsList[target]);
            break;
        case 'calamina':
            ipcRenderer.send('wood:edit', calaminasList[target]);
            break;
        case 'ironmongery':
            ipcRenderer.send('wood:edit', ironmongeryList[target]);
            break;
    }
}

async function deleteProduct(target) {
    let courrentProduct = await currentProductController.getCurrentProduct();
    switch(courrentProduct) {
        case 'wood':
            ipcRenderer.send('wood:delete', woodsList[target], courrentProduct);
            break;
        case 'calamina':
            ipcRenderer.send('wood:delete', calaminasList[target], courrentProduct);
            break;
        case 'ironmongery':
            ipcRenderer.send('wood:delete', ironmongeryList[target], courrentProduct);
            break;
    }
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
    let courrentProduct = await currentProductController.getCurrentProduct();
    let unity;
    if(courrentProduct == "wood") {
        unity = "ft";
    }

    if(courrentProduct == "calamina") {
        unity = "mts";
    }

    for(i = 0; i < woodsList.length; i++) {

        if(woodsList[i].counter)
            continue;
        if(woodsList[i].unitType) {
            if(woodsList[i].unitType == "unity")
                unity = "Unid";
            if(woodsList[i].unitType == "kg")
                unity = "Kg";
        }
        let content = `
        <tr class="dbl-click">
            <td class="clickable" onclick="showModal(${i})">${woodsList[i].idProduct}</td>
            <td id="dbl-menu" class="dbl-click">${woodsList[i].name_product}</td>
            <div class="dropup">
            <div id="${i}" class="dropdown-content">
            <a href="#" onclick="renderSaleW(${i})">Agregar a venta</a>
                <a href="#" onclick="editProduct(${i})">Editar ítem</a>
                <a href="#" onclick="deleteProduct(${i})">Eliminar ítem</a>
            </div>
            </div>
            <td>${woodsList[i].provider}</td>
            <td>${woodsList[i].descriptionProduct}</td>
            <td>${woodsList[i].reaminingAmount}</td>
            <td>${woodsList[i].quantity_sold}</td>
            <td>${woodsList[i].purchase_price}</td>
            <td>${woodsList[i].sale_price}</td>
            <td>${woodsList[i].purchased_total}</td>
            <td>${woodsList[i].total_sold}</td>
            <td>${woodsList[i].quantity}</td>
        </tr>
        `;
        tableBody.insertAdjacentHTML('beforeEnd',content);
    }

}

function chargeShoppingCartListInTable(shoppingCartList) {
  const tableBody = document.getElementById("shoppingCart-body");
  for(i = 0; i < shoppingCartList.length; i++) {
      
    if(shoppingCartList[i].counter)
        continue;
    let content = `
    <tr class="dbl-click">
        <td class="clickable" onclick="showModal(${i})">${shoppingCartList[i].idProduct}</td>
        <td id="dbl-menu" class="dbl-click">${shoppingCartList[i].name_product}</td>    
        <div class="dropup">
        <div id="${i}" class="dropdown-content">
            <a href="#" onclick="returnProduct(${i})">Devolver producto al inventario</a>
        </div>
        </div>
        <td>${shoppingCartList[i].descriptionProduct}</td>        
        <td>${shoppingCartList[i].sale_price}</td> 
        <td>${shoppingCartList[i].total_cost}</td> 
    </tr>
    `;
    tableBody.insertAdjacentHTML('beforeEnd',content);
 }
}

function chargeReceiptListInTable(receiptsList) {
    const tableBody = document.getElementById("receipts-body");
    for(i = 0; i < receiptsList.length; i++) {      
        if(receiptsList[i].counter)
            continue;
        let content = `
        <tr class="dbl-click">
            <td class="clickable" onclick="showReceipt(${i})">${receiptsList[i].head.unique}</td>
            <td id="dbl-menu" class="dbl-click">${receiptsList[i].head.client}</td>
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

function cleanShoppingCar() {
    let table = document.querySelector("#shoppingCart-body");
    while(table.hasChildNodes()) {
      table.removeChild(table.firstChild);
    }
}

function cleanReceiptsTable() {
    let table = document.querySelector("#receipts-body");
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
      case 'shoppingCart':
        cleanShoppingCar();
        const shoppingCartList = await getShoppingCart();
        chargeShoppingCartListInTable(shoppingCartList);
        break;
      case 'receipt':
        cleanReceiptsTable();
        receiptList = await getReceipt("receipts-body");
        chargeReceiptListInTable(receiptList);
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


async function returnProduct(index) {
    const shoppingCart = new ShoppingCartController();
    const shoppingCartList = await getShoppingCart();
    shoppingCart.returnProduct(shoppingCartList[index]);
    location.reload();
}
