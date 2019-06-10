const Datastore = require('nedb')

class WoodsDatabase{
    
    constructor() {
        this.woodDB = new Datastore({ filename: 'data/WOODS_DETAILS', autoload: true });
    }

    async saveProduct(newWood) {
        let saveProductWithCorrectId = await this.addId(newWood);
        this.woodDB.insert(saveProductWithCorrectId);
        this.updateId();
    }

    async getAllProducts() {
        let products = await this.dataBaseQueryFindAll();
        return products;
    }

    dataBaseQueryFindAll() {
        return new Promise((resolve, reject) =>{
            this.woodDB.find({}, function (err, docs) {
                resolve(docs);
            });
        })
    }

    async addId(wood) {
        let courrentId = await this.get_id();
        wood._id =  courrentId[0].counter.toString();
        return wood;
    }

    async updateId() {
        let numReplaced = 1;
        let courrentId = await this.get_id();
        numReplaced = Number(numReplaced);
        courrentId[0].counter++;


        this.woodDB.update({ flag: 'counter', counter: (courrentId[0].counter-1).toString() }, 
        {flag: 'counter', counter: (courrentId[0].counter).toString()}, 
        {}, 
        function (err, numReplaced) {
        }); 
    }

    get_id() {
        return new Promise((resolve, reject) =>{
            this.woodDB.find({ flag: 'counter' }, function (err, docs) {
              resolve(docs);
          });
        })
    }
}

module.exports = WoodsDatabase;