const DatabaseManager = require("./DatabaseManager");

class GetProduct{
    
    constructor() {
    }

    async getProduct(product, database) {
        let databaseManager = new DatabaseManager(database);
        return await databaseManager.getProduct(product); 
    }
}

module.exports = GetProduct;