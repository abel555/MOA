const DatabaseManager = require("./DatabaseManager");
class DeleteProduct{
    constructor(){
    }

    deleteProduct(product, database) {
        let databaseManager = new DatabaseManager(database);
        databaseManager.deleteProduct(product);
    }
}

module.exports = DeleteProduct;