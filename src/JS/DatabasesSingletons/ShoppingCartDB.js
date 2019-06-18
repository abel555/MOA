const Datastore = require('nedb');
const shoppingCartDB =  new Datastore({ filename: 'data/SHOPPINGCART_DETAILS', autoload: true });
Object.freeze(shoppingCartDB);

module.exports = shoppingCartDB;