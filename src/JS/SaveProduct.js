const DatabaseManager = require("./DatabaseManager");

class SaveProduct{
    constructor(){        
    }

    saveProduct(product, database) {
        let databaseManager = new DatabaseManager(database);
        databaseManager.saveProduct(product);
    }
}

module.exports = SaveProduct;