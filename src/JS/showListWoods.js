const path = require('path');
const fs = require('fs');
const jsonFilename = path.resolve(__dirname, '..', 'data', 'WOODS_DETAILS.json');

function search() {
  var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("woodList");
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

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'data/WOODS_DETAILS', autoload: true });

async function getWoodListFromJsonFile() {
  db.find({}, async function (err, docs) {
    return await docs;
  });

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


async function chargeListInTable(){

  const woodsList = await getWoodListFromJsonFile();

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

      document.querySelector("#woodList").appendChild(woodProductDetails);
  }
}
chargeCss();
chargeListInTable();