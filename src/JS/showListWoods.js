const path = require('path');
const fs = require('fs');
const jsonFilename = path.resolve(__dirname, '..', 'data', 'WOODS_DETAILS.json');
let courrentProduct = "woods";

var Datastore = require('nedb');
const db = new Datastore({ filename: 'data/WOODS_DETAILS', autoload: true });
const dbCalimnas = new Datastore({ filename: 'data/CALAMINAS_DETAILS', autoload: true });
const dbIronmongery = new Datastore({ filename: 'data/IRONMONGERY_DETAILS', autoload: true });

const woodButton = document.querySelector('#wood');
const calaminaButton = document.querySelector('#calamina');
const ironmongeryButton = document.querySelector('#ironmongery');

const addNewWood = document.querySelector('#addWoodForm');
const addNewCalamina = document.querySelector('#addCalaminaForm');
const addNewIronmongery = document.querySelector('#addIronmongeryForm');

woodButton.addEventListener('click', event => {
  addNewWood.style.display = 'block';
  addNewCalamina.style.display = 'none';
  addNewIronmongery.style.display = 'none';
  courrentProduct = "woods";
  chargeListByProduct();
})

calaminaButton.addEventListener('click', event => {
  addNewWood.style.display = 'none';
  addNewCalamina.style.display = 'block';
  addNewIronmongery.style.display = 'none';
  courrentProduct = "calaminas";
  chargeListByProduct();
})

ironmongeryButton.addEventListener('click', event => {
  addNewWood.style.display = 'none';
  addNewCalamina.style.display = 'none';
  addNewIronmongery.style.display = 'block';
  courrentProduct = "ironmongery";
  chargeListByProduct();
})
const product_click = document.getElementById("productsList");
product_click.addEventListener('contextmenu', event => {
  if (event.target.matches('.product-name')) {
    const row = event.target.parentElement.cloneNode(true);
    const saleTable = document.getElementById("salesList")
    saleTable.appendChild(row);
  }

}, false);

function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("productsList");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}

function chargeCss() {
  let link = document.createElement('link');
  const pathCss = path.resolve(__dirname, '..', 'CSS', 'index.css');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', pathCss);
  document.head.appendChild(link);
}

function getWoodListFromJsonFile() {
  return new Promise((resolve, reject) =>{
    db.find({}, function (err, docs) {
        resolve(docs);
    });
  })
}


function getCalaminaListFromJsonFile() {
  return new Promise((resolve, reject) =>{
    dbCalimnas.find({}, function (err, docs) {
        resolve(docs);
    });
  })
}

function getIronmongeryListFromJsonFile() {
  return new Promise((resolve, reject) =>{
    dbIronmongery.find({}, function (err, docs) {
        resolve(docs);
    });
  })
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
        <td>${woodsList[i].quantity - woodsList[i].quantity_sold}</td>
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
  switch(courrentProduct) {
    case 'woods':
      cleanTable();
      const woodsList = await getWoodListFromJsonFile();
      chargeListInTable(woodsList);
      break;
    case 'calaminas':
      cleanTable();
      const calaminasList = await getCalaminaListFromJsonFile();
      chargeListInTable(calaminasList);
      break;
    case 'ironmongery':
      cleanTable();
      const ironmongeryList = await getIronmongeryListFromJsonFile();
      chargeListInTable(ironmongeryList);
      break;
  }
}

chargeCss();
chargeListByProduct();





const ProductsController = require('../JS/ProductsController');

const productsController = new ProductsController();

const product = {
    descriptionProduct: "zxcas asd",
    quantity: "22",
    sale_price: "4532"
};

async function obtenerCalaminas() {
  console.log(await productsController.getAllProducts("calamina"));
}

obtenerCalaminas();