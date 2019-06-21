const ShoppingCartDB = require('./DatabasesSingletons/ShoppingCartDB');
const SaveProduct = require("./SaveProduct");
const GetAllProducts = require("./GetAllProducts");
const GetProduct = require("./GetProduct");
const UpdateProduct = require("./UpdateProduct");
const DeleteProduct = require("./DeleteProduct");
const DatabaseFactory = require("./DatabaseFactory");
const DeleteAllProducts = require("./DeleteAllProducts");

class ShoppingCartController {
    
    constructor() {
        this.databaseShoppingCartDB = ShoppingCartDB;
        this.saveShppingCart = new SaveProduct();
        this.getAll = new GetAllProducts();
        this.update = new UpdateProduct();
        this.delete = new DeleteProduct();
        this.getOneProduct = new GetProduct();
        this.deleteAll = new DeleteAllProducts();
    }

    async addNewProductToShoppingCart(newProduct) {
        let dataBasesFactory = new DatabaseFactory();
        let databaseProduct = dataBasesFactory.getDataBase(newProduct.typeProduct);
        
        const productInDB = {
            "idProduct": newProduct.idProduct,
            "descriptionProduct": newProduct.descriptionProduct,
        };
        
        let oldProductInDatabase = await this.getOneProduct.getProduct(productInDB, databaseProduct);
        let updatedProduct = await this.getOneProduct.getProduct(productInDB, databaseProduct);
        
        updatedProduct[0].total_sold = ((parseFloat(updatedProduct[0].total_sold) + (parseFloat(newProduct.total_cost)))).toFixed(2).toString();
        updatedProduct[0].quantity_sold = ((parseFloat(updatedProduct[0].quantity_sold) + parseFloat(newProduct.quantity))).toFixed(2).toString();
        updatedProduct[0].reaminingAmount = ((parseFloat(updatedProduct[0].reaminingAmount) - parseFloat(newProduct.quantity))).toFixed(2).toString();
                

        this.update.updateProduct(oldProductInDatabase[0], updatedProduct[0], databaseProduct);
        this.saveShppingCart.saveProduct(newProduct, this.databaseShoppingCartDB);
    }

    async getAllProducts() {
        return await this.getAll.getAllProducts(this.databaseShoppingCartDB);
    }

    async returnProduct(newProduct) {
        
        let dataBasesFactory = new DatabaseFactory();
        console.log(newProduct.typeProduct);
        let databaseProduct = dataBasesFactory.getDataBase(newProduct.typeProduct);
        
        const productInDB = {
            "idProduct": newProduct.idProduct,
            "descriptionProduct": newProduct.descriptionProduct,
        };

        let oldProductInDatabase = await this.getOneProduct.getProduct(productInDB, databaseProduct);
        let updatedProduct = await this.getOneProduct.getProduct(productInDB, databaseProduct);

        updatedProduct[0].total_sold = ((parseFloat(updatedProduct[0].total_sold) - (parseFloat(newProduct.total_cost)))).toFixed(2).toString();
        updatedProduct[0].quantity_sold = ((parseFloat(updatedProduct[0].quantity_sold) - parseFloat(newProduct.quantity))).toFixed(2).toString();
        updatedProduct[0].reaminingAmount = ((parseFloat(updatedProduct[0].reaminingAmount) + parseFloat(newProduct.quantity))).toFixed(2).toString();

        this.update.updateProduct(oldProductInDatabase[0], updatedProduct[0], databaseProduct);
        this.delete.deleteProduct(newProduct, this.databaseShoppingCartDB);
    }

    async clearAllShoppingCart() {
        this.deleteAll.deleteAllProducts(this.databaseShoppingCartDB);
    }

    async returnShoppingCart() {
        let products = await this.getAllProducts();
        for(let i = 0; i < products.length; i++) {
            if(products[i].counter)
                continue;
            this.returnProduct(products[i]);
        }
    }
}


// request-amount
module.exports = ShoppingCartController;