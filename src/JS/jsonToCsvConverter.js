const {
    parseAsync
} = require('json2csv');
const ProductsController = require('../JS/ProductsController');

class JSONToCSVConverter {
    constructor() {
        const productsFields = ['Código', 'Cliente', 'Contacto', 'Teléfono', 'Dirección', 'Tc',
            'Vendedor', 'NIT Cliente', 'Número', 'Fecha', 'Fecha Vto', 'Factura No.', 'Forma de pago'
        ];
        this.productsOpts = {
            productsFields,
            excelStrings: true
        };
        this.parse = parseAsync;
        this.productsController = new ProductsController();
    }

    async getWoodInCSV() {
        let wood = await this.productsController.getAllProducts("wood");
        wood.shift();
        let woodsCSV = await this.convertProductJSONToCSV(wood);
        return woodsCSV;
    }
    async getIronmongeryInCSV() {
        let ironmongery = await this.productsController.getAllProducts("ironmongery");
        ironmongery.shift();
        let ironmongeryCSV = await this.convertProductJSONToCSV(ironmongery);
        return ironmongeryCSV;
    }
    async getCalaminasInCSV() {
        let calaminas = await this.productsController.getAllProducts("calamina");
        calaminas.shift();
        let calaminasCSV = await this.convertProductJSONToCSV(calaminas);
        return calaminasCSV;
    }

    convertProductJSONToCSV(data) {
        return new Promise(async (resolve, reject) => {
            let csvFile = await this.parse(data, this.productsOpts);
            resolve(csvFile);
        })
    }

}

module.exports = JSONToCSVConverter;