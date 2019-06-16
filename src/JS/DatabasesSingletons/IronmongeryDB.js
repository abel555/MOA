const Datastore = require('nedb')
const ironmongeryDB =  new Datastore({ filename: 'data/IRONMONGERY_DETAILS', autoload: true });
Object.freeze(ironmongeryDB);

module.exports = ironmongeryDB;