const DatabaseFactory = require("./DatabaseFactory");

class DatabaseController{
    constructor(){

    }

    saveProduct(product, type) {
        let dataBasesFactory = new DatabaseFactory();
        let database = dataBasesFactory.getDataBase(type);
        database.saveProduct(product)
    }

    async getAllProducts(type) {
        let dataBasesFactory = new DatabaseFactory();
        let database = dataBasesFactory.getDataBase(type);
        return await database.getAllProducts();
    }
}

module.exports = DatabaseController;