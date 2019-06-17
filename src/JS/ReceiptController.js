const SaveProduct = require("./SaveProduct");
const GetAllProducts = require("./GetAllProducts");
const UpdateProduct = require("./UpdateProduct");
const Datastore = require('nedb')

class ReceiptController{

    constructor(){
        this.dbInstance = new Datastore({ filename: 'data/RECEIPTS_DETAILS', autoload: true });  
        this.save = new SaveProduct();
        this.getAll = new GetAllProducts();
        this.update = new UpdateProduct();
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
    
}

module.exports = ReceiptController;