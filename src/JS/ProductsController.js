const DatabaseFactory = require("./DatabaseFactory");
const SaveProduct = require("./SaveProduct");
const GetAllProducts = require("./GetAllProducts");
class DatabaseController{

    constructor(){
        this.dataBasesFactory = new DatabaseFactory();
        this.save = new SaveProduct();
        this.getAll = new GetAllProducts();
    }

    saveProduct(product, type) {
        let database = this.dataBasesFactory.getDataBase(type);
        this.save.saveProduct(product, database);
    }

    async getAllProducts(type) {
        let dataBasesFactory = new DatabaseFactory();
        let database = dataBasesFactory.getDataBase(type);
        return await this.getAll.getAllProducts(database);
    }
}

module.exports = DatabaseController;