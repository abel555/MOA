const DatabaseManager = require("./DatabaseManager");
class GetAllProducts{
    
    constructor() {
    }

    async getAllProducts(database) {
        let databaseManager = new DatabaseManager(database);
        return await databaseManager.getAllProducts(); 
    }
}

module.exports = GetAllProducts;