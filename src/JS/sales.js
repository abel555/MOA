const renderSale = document.querySelector('#sale');
const renderWood = document.querySelector('#wood');
const renderCalaminas = document.querySelector('#calamina');
const renderIronMengery = document.querySelector('#ironmongery');
const woodTable = document.querySelector('#productsList');
const saleTable = document.querySelector('#salesList');


renderSale.addEventListener('click', event => {
    event.preventDefault();
    woodTable.style.display = 'none';
    saleTable.style.display = 'block';
})

renderWood.addEventListener('click', event => {
    woodTable.style.display = 'block';
    saleTable.style.display = 'none';
})

renderCalaminas.addEventListener('click', event => {
    woodTable.style.display = 'block';
    saleTable.style.display = 'none';
})

renderIronMengery.addEventListener('click', event => {
    woodTable.style.display = 'block';
    saleTable.style.display = 'none';
})