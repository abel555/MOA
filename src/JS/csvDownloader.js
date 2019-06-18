const {
    dialog
} = require('electron')

const {ipcRenderer} = require('electron');

const Converter = require('../JS/jsonToCsvConverter');

const JSONconverter = new Converter();

function download_csv(data) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
}

ipcRenderer.on('message', function(event, message){
    downloadProductsInCSV(message);
});

async function downloadProductsInCSV(type){
    let productsCSV = await JSONconverter.getProductsInCSV(type);
    download_csv(productsCSV);
    ipcRenderer.send('product:download');
}