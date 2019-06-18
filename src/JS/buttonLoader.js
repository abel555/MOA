const currentProductCon = new CurrentProductController();

function showWoodButton(){
    addNewWood.style.display = 'block';
    addNewCalamina.style.display = 'none';
    addNewIronmongery.style.display = 'none';
}

function showIronmongeryButton(){
    addNewIronmongery.style.display = 'none';
    addNewCalamina.style.display = 'none';
    addNewIronmongery.style.display = 'block';
}
function showCalaminaButton(){
    addNewIronmongery.style.display = 'none';
    addNewCalamina.style.display = 'block';
    addNewIronmongery.style.display = 'none';
}

async function loadButtonFromCurrentProduct() {
    let currentProduct = await currentProductCon.getCurrentProduct();
    console.log(currentProduct);
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
    }
}

loadButtonFromCurrentProduct();