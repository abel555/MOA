const Datastore = require('nedb')
const receiptsDB =  new Datastore({ filename: 'data/RECEIPTS_DETAILS', autoload: true });
Object.freeze(receiptsDB);

module.exports = receiptsDB;