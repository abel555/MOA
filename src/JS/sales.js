const renderSale = document.querySelector('#shoppingCart');
const renderReceipt = document.querySelector('#receipt');
const renderWood = document.querySelector('#wood');
const renderCalaminas = document.querySelector('#calamina');
const renderIronMengery = document.querySelector('#ironmongery');
const woodTable = document.querySelector('#productsList');
const saleTable = document.querySelector('#shoppingCartList');
const receiptTable = document.querySelector('#receiptList');

renderReceipt.addEventListener('click', event => {
    event.preventDefault();
    woodTable.style.display = 'none';
    saleTable.style.display = 'none';
    receiptTable.style.display = 'block';
})

renderSale.addEventListener('click', event => {
    event.preventDefault();
    woodTable.style.display = 'none';
    saleTable.style.display = 'block';
    receiptTable.style.display = 'none';
})

renderWood.addEventListener('click', event => {
    woodTable.style.display = 'block';
    saleTable.style.display = 'none';
    receiptTable.style.display = 'none';
})

renderCalaminas.addEventListener('click', event => {
    woodTable.style.display = 'block';
    saleTable.style.display = 'none';
    receiptTable.style.display = 'none';
})

renderIronMengery.addEventListener('click', event => {
    woodTable.style.display = 'block';
    saleTable.style.display = 'none';
    receiptTable.style.display = 'none';
})

const ipc = require('electron').ipcRenderer;