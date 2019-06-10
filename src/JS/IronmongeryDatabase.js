const Datastore = require('nedb')

class IronmongeryDatabase{
    constructor() {
        this.ironmongeryDB = new Datastore({ filename: 'data/IRONMONGERY_DETAILS', autoload: true });
    }

    async saveProduct(newIronmongery) {
        let saveProductWithCorrectId = await this.addId(newIronmongery);
        this.ironmongeryDB.insert(saveProductWithCorrectId);
        this.updateId();
    }

    async getAllProducts() {
        let products = await this.dataBaseQueryFindAll();
        return products;
    }

    dataBaseQueryFindAll() {
        return new Promise((resolve, reject) =>{
            this.ironmongeryDB.find({}, function (err, docs) {
                resolve(docs);
            });
        })
    }

    async addId(ironmongery) {
        let courrentId = await this.get_id();
        ironmongery._id =  courrentId[0].counter.toString();
        return ironmongery;
    }

    async updateId() {
        let numReplaced = 1;
        let courrentId = await this.get_id();
        numReplaced = Number(numReplaced);
        courrentId[0].counter++;

        this.ironmongeryDB.update({ flag: 'counter', counter: (courrentId[0].counter-1).toString() }, 
        {flag: 'counter', counter: (courrentId[0].counter).toString()}, 
        {}, 
        function (err, numReplaced) {
        }); 
    }

    get_id() {
        return new Promise((resolve, reject) =>{
            this.ironmongeryDB.find({ flag: 'counter' }, function (err, docs) {
              resolve(docs);
          });
        })
    }
}

module.exports = IronmongeryDatabase;