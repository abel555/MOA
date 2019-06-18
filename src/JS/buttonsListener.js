const products = require('../JS/ProductsViews');

const woodButton = document.querySelector('#wood');
const calaminaButton = document.querySelector('#calamina');
const ironmongeryButton = document.querySelector('#ironmongery');

const addNewWood = document.querySelector('#addWoodForm');
const addNewCalamina = document.querySelector('#addCalaminaForm');
const addNewIronmongery = document.querySelector('#addIronmongeryForm');


chargeListByProduct();
woodButton.addEventListener('click', async event => {
  await currentProductController.UpdateCurrentProduct("wood");
  addNewWood.style.display = 'block';
  addNewCalamina.style.display = 'none';
  addNewIronmongery.style.display = 'none';
  await chargeListByProduct();
});

calaminaButton.addEventListener('click', async event => {
  await currentProductController.UpdateCurrentProduct("calamina");
  addNewWood.style.display = 'none';
  addNewCalamina.style.display = 'block';
  addNewIronmongery.style.display = 'none';
  await chargeListByProduct();
});

ironmongeryButton.addEventListener('click',async event => {
  await currentProductController.UpdateCurrentProduct("ironmongery");
  addNewWood.style.display = 'none';
  addNewCalamina.style.display = 'none';
  addNewIronmongery.style.display = 'block';
  await chargeListByProduct();
});



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

