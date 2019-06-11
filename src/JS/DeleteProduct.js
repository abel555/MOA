const DatabaseManager = require("./DatabaseManager");
class UpdateProduct{
    constructor(){
    }

    deleteProduct(product, database) {
        let databaseManager = new DatabaseManager(database);
        databaseManager.deleteProduct(product);
    }
}

module.exports = UpdateProduct;