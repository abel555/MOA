const Datastore = require('nedb')
const currentProductDB =  new Datastore({ filename: 'data/CURRENT_PRODUCT', autoload: true });
Object.freeze(currentProductDB);

module.exports = currentProductDB;