const DatabaseManager = require("./DatabaseManager");
class UpdateProduct{
    constructor(){
    }

    updateProduct(oldProduct, newProduct, database) {
        let databaseManager = new DatabaseManager(database);
        databaseManager.updateProduct(oldProduct, newProduct);
    }
}

module.exports = UpdateProduct;