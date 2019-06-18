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
        
        updatedProduct[0].quantity = (parseFloat(updatedProduct[0].quantity) - parseFloat(newProduct.quantity)).toString();
        updatedProduct[0].quantity_sold = (parseFloat(updatedProduct[0].quantity_sold) + parseFloat(newProduct.quantity)).toString();
        updatedProduct[0].total_sold = (parseFloat(updatedProduct[0].total_sold) + (parseFloat(newProduct.quantity))).toString();
        updatedProduct[0].reaminingAmount = (parseFloat(updatedProduct[0].reaminingAmount) - parseFloat(newProduct.quantity)).toString();

        this.update.updateProduct(oldProductInDatabase[0], updatedProduct[0], databaseProduct);
        this.saveShppingCart.saveProduct(newProduct, this.databaseShoppingCartDB);
    }

    async getAllProducts() {
        return await this.getAll.getAllProducts(this.databaseShoppingCartDB);
    }

    deleteProduct(product) {
        
        this.delete.deleteProduct(product, this.databaseShoppingCartDB);
    }

    async clearAllShoppingCartGiveBack() {
        let dataBasesFactory = new DatabaseFactory();
        let databaseProduct;
        
        let productInDB;

        let allShoppingCartProducts = await this.getAllProducts();
        let oldProductInDatabase;
        let updatedProduct;
        for(let i = 0; i < allShoppingCartProducts.length; i++) {
            if(allShoppingCartProducts[i].typeProduct == undefined)
                continue;
            databaseProduct = dataBasesFactory.getDataBase(allShoppingCartProducts[i].typeProduct);
            productInDB = {
                "idProduct": allShoppingCartProducts[i].idProduct,
                "descriptionProduct": allShoppingCartProducts[i].descriptionProduct,
            };
            oldProductInDatabase = await this.getOneProduct.getProduct(productInDB, databaseProduct);
            updatedProduct = await this.getOneProduct.getProduct(productInDB, databaseProduct);

            updatedProduct[0].quantity = (parseFloat(updatedProduct[0].quantity) + parseFloat(allShoppingCartProducts[i].quantity)).toString();
            updatedProduct[0].quantity_sold = (parseFloat(updatedProduct[0].quantity_sold) - parseFloat(allShoppingCartProducts[i].quantity)).toString();
            updatedProduct[0].total_sold = (parseFloat(updatedProduct[0].total_sold) - parseFloat(allShoppingCartProducts[i].quantity)).toString();
            updatedProduct[0].reaminingAmount = (parseFloat(updatedProduct[0].reaminingAmount) + parseFloat(allShoppingCartProducts[i].quantity)).toString();
            this.update.updateProduct(oldProductInDatabase[0], updatedProduct[0], databaseProduct);
            this.deleteAll.deleteAllProducts(this.databaseShoppingCartDB);
        }
    }

    async clearAllShoppingCart() {
        this.deleteAll.deleteAllProducts(this.databaseShoppingCartDB);
    }
}

module.exports = ShoppingCartController;

