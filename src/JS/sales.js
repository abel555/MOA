const renderSale = document.querySelector('#sale');
const renderWood = document.querySelector('#wood');
const woodTable = document.querySelector('#woodList');
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