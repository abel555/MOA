const woodsList = require('../../data/WOODS_DETAILS.json');
console.log(woodList);
function chargeListInTable(){

  let woodProductDetails;
  let name;
  let type; 
  let quantity;
  let salePrice;
  let purcharsePrice;

  let nameText;
  let quantityText;
  let typeText
  let salePriceText;
  let purcharsePriceText;

  woodsList.forEach(function(woodProduct) {
    woodProductDetails = document.createElement("tr");
    name = document.createElement("td");
    type = document.createElement("td");
    quantity = document.createElement("td");
    salePrice = document.createElement("td");
    purcharsePrice = document.createElement("td");

    nameText = document.createTextNode(woodProduct.name);
    typeText = document.createTextNode(woodProduct.type);
    quantityText = document.createTextNode(woodProduct.quantity);
    salePriceText = document.createTextNode(woodProduct.sale_price);
    purcharsePriceText = document.createTextNode(woodProduct.purchase_price);

    name.appendChild(nameText);
    type.appendChild(typeText);
    quantity.appendChild(quantityText);
    salePrice.appendChild(salePriceText);
    purcharsePrice.appendChild(purcharsePriceText);

    woodProductDetails.appendChild(name);
    woodProductDetails.appendChild(type);
    woodProductDetails.appendChild(quantity);
    woodProductDetails.appendChild(salePrice);
    woodProductDetails.appendChild(purcharsePriceText);

    document.querySelector("#woodList").appendChild(woodProductDetails);
  });
}

chargeListInTable();