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

function chargeHeader() {

  table = document.createElement("tr");
  table.classList.add("table-title");
  let codigo = document.createElement("th");
  let nombre = document.createElement("th");
  let proveedor = document.createElement("th");
  let descripcion = document.createElement("th");
  let cantidad = document.createElement("th");
  let cantidadVendida = document.createElement("th");
  let precioCompra = document.createElement("th");
  let precioVenta = document.createElement("th");
  let totalCompra = document.createElement("th");
  let totalVenta = document.createElement("th");
  let cantidadRestante = document.createElement("th");
  
  codigo.appendChild(document.createTextNode("Código"));
  nombre.appendChild(document.createTextNode("Nombre"));
  proveedor.appendChild(document.createTextNode("Proveedor"));
  descripcion.appendChild(document.createTextNode("Descripción"));
  cantidad.appendChild(document.createTextNode("Cantidad"));
  cantidadVendida.appendChild(document.createTextNode("Cant. vendida"));
  precioCompra.appendChild(document.createTextNode("P. compra"));
  precioVenta.appendChild(document.createTextNode("P. venta"));
  totalCompra.appendChild(document.createTextNode("T. compra"));
  totalVenta.appendChild(document.createTextNode("T. venta"));
  cantidadRestante.appendChild(document.createTextNode("Cant. restante"));
  
  table.appendChild(codigo);
  table.appendChild(nombre);
  table.appendChild(proveedor);
  table.appendChild(descripcion);
  table.appendChild(cantidad);
  table.appendChild(cantidadVendida);
  table.appendChild(precioCompra);
  table.appendChild(precioVenta);
  table.appendChild(totalCompra);
  table.appendChild(totalVenta);
  table.appendChild(cantidadRestante);

  document.querySelector("#productsList").appendChild(table);
}

async function chargeListInTable(woodsList){

  let idProduct;
  let descriptionProduct;
  let quantity;
  let purcharsePrice;
  let purchaseTotal;

  let nameProduct;
  let provider;
  let quantitySold;
  let salePrice;
  let totalSold;
  let reaminingAmount;
  chargeHeader();
  for(i = 0; i < woodsList.length; i++) {
    
    if(woodsList[i].counter)
         continue;

    woodProductDetails = document.createElement("tr");
    
      idProduct = document.createElement("td");
      nameProduct = document.createElement("td");
      provider = document.createElement("td");
      descriptionProduct = document.createElement("td");
      quantity = document.createElement("td");

      quantitySold = document.createElement("td");
      purcharsePrice = document.createElement("td");
      salePrice = document.createElement("td");
      purchaseTotal = document.createElement("td");
      totalSold = document.createElement("td");
      reaminingAmount = document.createElement("td");

      idProductText = document.createTextNode(woodsList[i].idProduct);
      nameProductText = document.createTextNode(woodsList[i].name_product);
      providerText = document.createTextNode(woodsList[i].provider);
      descriptionText = document.createTextNode(woodsList[i].descriptionProduct);
      quantityText = document.createTextNode(woodsList[i].quantity);
        
      quantitySoldText = document.createTextNode(woodsList[i].quantity_sold);
      purcharsePriceText = document.createTextNode(woodsList[i].purchase_price);
      salePriceText = document.createTextNode(woodsList[i].sale_price);
      purchaseTotalText = document.createTextNode(woodsList[i].purchased_total);
      totalSoldText = document.createTextNode(woodsList[i].total_sold);
      reaminingAmountText = document.createTextNode(woodsList[i].quantity - woodsList[i].quantity_sold);

      idProduct.appendChild(idProductText);
      nameProduct.appendChild(nameProductText);
      provider.appendChild(providerText);
      descriptionProduct.appendChild(descriptionText);
      quantity.appendChild(quantityText);

      quantitySold.appendChild(quantitySoldText);
      purcharsePrice.appendChild(purcharsePriceText);
      salePrice.appendChild(salePriceText);
      purchaseTotal.appendChild(purchaseTotalText);
      totalSold.appendChild(totalSoldText);
      reaminingAmount.appendChild(reaminingAmountText);
      
      woodProductDetails.appendChild(idProduct);
      woodProductDetails.appendChild(nameProduct);
      woodProductDetails.appendChild(provider);
      woodProductDetails.appendChild(descriptionProduct);
      woodProductDetails.appendChild(quantity);

      woodProductDetails.appendChild(quantitySold);
      woodProductDetails.appendChild(purcharsePrice);
      woodProductDetails.appendChild(salePrice);
      woodProductDetails.appendChild(purcharsePrice);
      woodProductDetails.appendChild(purchaseTotal);
      woodProductDetails.appendChild(totalSold);

      woodProductDetails.appendChild(reaminingAmount);

      document.querySelector("#productsList").appendChild(woodProductDetails);
  }
}

function cleanTable() {
  let table = document.querySelector("#productsList");
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
