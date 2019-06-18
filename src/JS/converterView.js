const {
    dialog
} = require('electron')

const Converter = require('../JS/jsonToCsvConverter');

const JSONconverter = new Converter();

function download_csv(data) {
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(data);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
}


let downloadWood = document.querySelector("#descargarMadera");
downloadWood.addEventListener("click", async () => {
    let woodsCSV = await JSONconverter.getWoodInCSV();
    download_csv(woodsCSV);
});

let downloadIronmongery = document.querySelector("#descargarFerreteria");
downloadIronmongery.addEventListener("click", async () => {
    let ironmongeryCSV = await JSONconverter.getIronmongeryInCSV();
    download_csv(ironmongeryCSV);
});

let downloadCalamina = document.querySelector("#descargarCalaminas");
downloadCalamina.addEventListener("click", async () => {
    let calaminaCSV = await JSONconverter.getCalaminasInCSV();
    download_csv(calaminaCSV);
});