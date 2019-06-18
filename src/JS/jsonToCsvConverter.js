const {
    parseAsync
} = require('json2csv');
const ProductsController = require('../JS/ProductsController');

class JSONToCSVConverter {
    constructor() {
        const productsFields = [];
        this.productsOpts = {
            productsFields,
            excelStrings: true
        };
        this.parse = parseAsync;
        this.productsController = new ProductsController();
    }

    async getProductsInCSV(type){
        let product = await this.productsController.getAllProducts(type);
        product.shift();
        let productCSV = await this.convertProductJSONToCSV(product);
        return productCSV;
    }
    
    convertProductJSONToCSV(data) {
        return new Promise(async (resolve, reject) => {
            let csvFile = await this.parse(data, this.productsOpts);
            resolve(csvFile);
        })
    }

}

module.exports = JSONToCSVConverter;