const Datastore = require('nedb');
const woodsDB =  new Datastore({ filename: 'data/WOODS_DETAILS', autoload: true });
Object.freeze(woodsDB);

module.exports = woodsDB;