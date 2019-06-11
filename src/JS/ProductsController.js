const DatabaseFactory = require("./DatabaseFactory");
const SaveProduct = require("./SaveProduct");
const GetAllProducts = require("./GetAllProducts");
const UpdateProduct = require("./UpdateProduct");
const DeleteProduct = require("./DeleteProduct");

class DatabaseController{

    constructor(){
        this.dataBasesFactory = new DatabaseFactory();
        this.save = new SaveProduct();
        this.getAll = new GetAllProducts();
        this.update = new UpdateProduct();
        this.delete = new DeleteProduct();
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

    updateProduct(oldProduct, newProduct, type) {
        let dataBasesFactory = new DatabaseFactory();
        let database = dataBasesFactory.getDataBase(type);
        this.update.updateProduct(oldProduct, newProduct, database);
    }
    
    deleteProduct(product, type) {
        let dataBasesFactory = new DatabaseFactory();
        let database = dataBasesFactory.getDataBase(type);
        this.delete.deleteProduct(product, database);
    }
}

module.exports = DatabaseController;