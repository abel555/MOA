const Datastore = require('nedb')
const calaminasDB =  new Datastore({ filename: 'data/CALAMINAS_DETAILS', autoload: true });
Object.freeze(calaminasDB);

module.exports = calaminasDB;