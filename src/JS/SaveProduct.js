const DatabaseController = require("./DatabaseController");

class AddProduct{
    constructor(){
        this.databaseController = new DatabaseController();        
    }

    saveProduct(product, type) {
        this.databaseController.saveProduct(product, type);
    }
}

module.exports = AddProduct;