const Datastore = require('nedb')

class CalaminasDatabase{
    constructor() {
        this.calaminasDB = new Datastore({ filename: 'data/CALAMINAS_DETAILS', autoload: true });
    }

    async saveProduct(newCalamina) {
        let saveProductWithCorrectId = await this.addId(newCalamina);
        this.calaminasDB.insert(saveProductWithCorrectId);
        this.updateId();
    }

    async addId(calamina) {
        let courrentId = await this.get_id();
        calamina._id =  courrentId[0].counter.toString();
        return calamina;
    }

    async updateId() {
        let numReplaced = 1;
        let courrentId = await this.get_id();
        numReplaced = Number(numReplaced);
        courrentId[0].counter++;

        this.calaminasDB.update({ flag: 'counter', counter: (courrentId[0].counter-1).toString() }, 
        {flag: 'counter', counter: (courrentId[0].counter).toString()}, 
        {}, 
        function (err, numReplaced) {
        }); 
    }

    get_id() {
        return new Promise((resolve, reject) =>{
            this.calaminasDB.find({ flag: 'counter' }, function (err, docs) {
              resolve(docs);
          });
        })
    }

    async getAllProducts() {
        let products = await this.dataBaseQueryFindAll();
        return products;
    }

    dataBaseQueryFindAll() {
        return new Promise((resolve, reject) =>{
            this.calaminasDB.find({}, function (err, docs) {
                resolve(docs);
            });
        })
    }
}

module.exports = CalaminasDatabase;