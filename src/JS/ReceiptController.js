const SaveProduct = require("./SaveProduct");
const GetAllProducts = require("./GetAllProducts");
const UpdateProduct = require("./UpdateProduct");
const DeleteProduct = require("./DeleteProduct");

const ReceiptDB = require('./DatabasesSingletons/ReceiptsDB');

class ReceiptController{

    constructor(){
        this.dbInstance = ReceiptDB;  
        this.save = new SaveProduct();
        this.getAll = new GetAllProducts();
        this.update = new UpdateProduct();
        this.delete = new DeleteProduct();
    }

    saveReceipt(receipt) {
        this.save.saveProduct(receipt, this.dbInstance);
    }

    async getAllReceipts() {
        return await this.getAll.getAllProducts(this.dbInstance);
    }

    updateReceipt(oldReceipt, newReceipt) {
        this.update.updateProduct(oldReceipt, newReceipt, this.dbInstance);
    }

    deleteReceipt(receipt) {
        this.delete.deleteProduct(receipt, this.dbInstance);
    }
}

module.exports = ReceiptController;