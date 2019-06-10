class DatabaseManager{
    constructor(database){
        this.database = database;        
    }

    async saveProduct(newProduct) {
        let saveProductWithCorrectId = await this.addId(newProduct);
        this.database.insert(saveProductWithCorrectId);
        this.updateId();
    }

    async getAllProducts() {
        let products = await this.dataBaseQueryFindAll();
        return products;
    }

    updateProduct(oldProduct, newProduct) {
        let numReplaced = 1;
        numReplaced = Number(numReplaced);
        this.database.update(oldProduct, newProduct, {}, function (err, numReplaced) {
        });
    }

    async dataBaseQueryFindAll() {
        return await new Promise((resolve, reject) =>{
            this.database.find({}, function (err, docs) {
                resolve(docs);
            });
        })
    }

    async addId(product) {
        let courrentId = await this.get_id();
        product._id =  courrentId[0].counter.toString();
        return product;
    }

    async updateId() {
        let numReplaced = 1;
        let courrentId = await this.get_id();
        numReplaced = Number(numReplaced);
        courrentId[0].counter++;

        this.database.update({ flag: 'counter', counter: (courrentId[0].counter-1).toString() }, 
        {flag: 'counter', counter: (courrentId[0].counter).toString()}, 
        {}, 
        function (err, numReplaced) {
        }); 
    }

    get_id() {
        return new Promise((resolve, reject) =>{
            this.database.find({ flag: 'counter' }, function (err, docs) {
              resolve(docs);
          });
        })
    }
}

module.exports = DatabaseManager;