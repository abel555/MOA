const { ipcRenderer } = require('electron');
const addNewWoodButton = document.querySelector('#addNewWood');

addNewWoodButton.addEventListener('click', event => {
    event.preventDefault();
    ipcRenderer.send('product:form');
})