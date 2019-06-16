const Datastore = require('nedb')
const WoodsDB = require('./DatabasesSingletons/WoodsDB')
const CalaminasDB = require('./DatabasesSingletons/CalaminasDB')
const IronmongeryDB = require('./DatabasesSingletons/IronmongeryDB');

class DatabaseFactory {
    constructor() {
        if(! DatabaseFactory.instance){
            DatabaseFactory.instance = this;
          }
          return DatabaseFactory.instance;
    }

    getDataBase(type) {
        switch (type) {
            case "wood":
                return WoodsDB;
                break;
            case "calamina":
                return CalaminasDB;
                break;
            case "ironmongery":
                return IronmongeryDB;
                break;
            default:
                return "that database doesnt exist!";
                break;
        }
    }
}

module.exports = DatabaseFactory;