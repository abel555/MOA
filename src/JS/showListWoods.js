const path = require('path');
const fs = require('fs');
const jsonFilename = path.resolve(__dirname, '..', 'data', 'WOODS_DETAILS.json');

function getWoodListFromJsonFile() {
  let woodsJSON = fs.readFileSync(jsonFilename);
  let woodList = JSON.parse(woodsJSON);
  return woodList;
}

function chargeCss() {
  let link = document.createElement('link');
  const pathCss = path.resolve(__dirname, '..', 'CSS', 'index.css');
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('href', pathCss);
  document.head.appendChild(link);
}

function chargeListInTable(){
  const woodsList = getWoodListFromJsonFile();
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
  
  woodsList.forEach(function(woodProduct) {
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
      
      idProductText = document.createTextNode(woodProduct.idProduct);
      nameProductText = document.createTextNode(woodProduct.name_product);
      providerText = document.createTextNode(woodProduct.provider);
      descriptionText = document.createTextNode(woodProduct.descriptionProduct);
      quantityText = document.createTextNode(woodProduct.quantity);
        
      quantitySoldText = document.createTextNode(woodProduct.quantity_sold);
      purcharsePriceText = document.createTextNode(woodProduct.purchase_price);
      salePriceText = document.createTextNode(woodProduct.sale_price);
      purchaseTotalText = document.createTextNode(woodProduct.purchased_total);
      totalSoldText = document.createTextNode(woodProduct.total_sold);

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

      document.querySelector("#woodList").appendChild(woodProductDetails);
  });
}
chargeCss();
chargeListInTable();