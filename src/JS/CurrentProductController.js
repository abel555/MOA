const CurrentProductDB = require('./DatabasesSingletons/CurrentProductDB');
const GetAllProducts = require("./GetAllProducts");
const UpdateProduct = require("./UpdateProduct");

class CurrentProductController {
    
    constructor() {
        this.database = CurrentProductDB;
        this.getAll = new GetAllProducts();
        this.update = new UpdateProduct();
    }

    async getCurrentProductQuery() {
        let currentQuery = await this.getAll.getAllProducts(this.database);
        return currentQuery[0];
    }

    async getCurrentProduct() {
        let currentProduct = await this.getCurrentProductQuery();
        return currentProduct.current;
    }

    async UpdateCurrentProduct(newCurrentProduct) {
        let oldProduct = await this.getCurrentProductQuery();
        const newCurrentProductDB = {'current': newCurrentProduct};
        return await this.update.updateProduct(oldProduct, newCurrentProductDB, this.database);
    }
}

module.exports = CurrentProductController;