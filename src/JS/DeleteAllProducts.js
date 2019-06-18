const DatabaseManager = require("./DatabaseManager");
class DeleteAllProducts{
    constructor(){
    }

    deleteAllProducts(database) {
        let databaseManager = new DatabaseManager(database);
        databaseManager.deleteAllProducts();
    }
}

module.exports = DeleteAllProducts;