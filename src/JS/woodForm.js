const { ipcRenderer } = require('electron');
const addNewWoodButton = document.querySelector('#addNewWood');
const addNewCalaminaButton = document.querySelector('#addNewCalamina');
const addNewIronmongeryButton = document.querySelector('#addNewIronmongery');

addNewWoodButton.addEventListener('click', event => {
    event.preventDefault();
    ipcRenderer.send('product:form');
});

addNewCalaminaButton.addEventListener('click', event => {
    event.preventDefault();
    ipcRenderer.send('calamina:form');
});

addNewIronmongeryButton.addEventListener('click', event => {
    event.preventDefault();
    ipcRenderer.send('ironmongery:form');
});