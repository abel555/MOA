
const products = require('../JS/ProductsViews');

const addNewWood = document.querySelector('#addWoodForm');
const addNewCalamina = document.querySelector('#addCalaminaForm');
const addNewIronmongery = document.querySelector('#addIronmongeryForm');


async function loadButtonFromCurrentProduct() {
    let currentProduct = await currentProductController.getCurrentProduct();
    switch (currentProduct) {
        case 'wood':
            showWoodButton();
            break;
        case 'calamina':
            showCalaminaButton();
            break;
        default:
            showIronmongeryButton();
            break;
    }
}

function showWoodButton(){
    addNewWood.style.display = 'block';
    addNewCalamina.style.display = 'none';
    addNewIronmongery.style.display = 'none';
}

function showIronmongeryButton(){
    addNewWood.style.display = 'none';
    addNewCalamina.style.display = 'none';
    addNewIronmongery.style.display = 'block';
}
function showCalaminaButton(){
    addNewWood.style.display = 'none';
    addNewCalamina.style.display = 'block';
    addNewIronmongery.style.display = 'none';
}

loadButtonFromCurrentProduct();