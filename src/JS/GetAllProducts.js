const DatabaseController = require("./DatabaseController");

class GetAllProducts{
    constructor() {
        this.dataBaseController = new DatabaseController();
    }

    async getAllProducts(type) { 
        return await this.dataBaseController.getAllProducts(type);
    }
}

module.exports = GetAllProducts;

module.exports = GetAllProducts;