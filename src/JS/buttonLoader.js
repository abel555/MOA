const currentProductCon = new CurrentProductController();

function showWoodButton(){
    addNewWood.style.display = 'block';
    addNewCalamina.style.display = 'none';
    addNewIronmongery.style.display = 'none';
    addSaleConfirmation.style.display = 'none';
    returnShoppingCartButton.style.display = 'none';
}

function showIronmongeryButton(){
    addNewIronmongery.style.display = 'none';
    addNewCalamina.style.display = 'none';
    addNewIronmongery.style.display = 'block';
    addSaleConfirmation.style.display = 'none';
    returnShoppingCartButton.style.display = 'none';
}
function showCalaminaButton(){
    addNewIronmongery.style.display = 'none';
    addNewCalamina.style.display = 'block';
    addNewIronmongery.style.display = 'none';
    addSaleConfirmation.style.display = 'none';
    returnShoppingCartButton.style.display = 'none';
}

function showSaleButton(){
    addNewIronmongery.style.display = 'none';
    addNewCalamina.style.display = 'none';
    addNewIronmongery.style.display = 'none';
    addSaleConfirmation.style.display = 'block';
    returnShoppingCartButton.style.display = 'block';
}

function showNoButton(){
    addNewIronmongery.style.display = 'none';
    addNewCalamina.style.display = 'none';
    addNewIronmongery.style.display = 'none';
    addSaleConfirmation.style.display = 'none';
}

async function loadButtonFromCurrentProduct() {
    let currentProduct = await currentProductCon.getCurrentProduct();
    switch (currentProduct) {
        case 'wood':
            showWoodButton();
            break;
        case 'calamina':
            showCalaminaButton();
            break;
        case 'ironmongery':
            showIronmongeryButton();
            break;
        case 'shoppingCart':
            showSaleButton();
            break;
        case 'receipt':
            showNoButton();
            break;
    }
}

loadButtonFromCurrentProduct();