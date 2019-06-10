const Datastore = require('nedb')

class DatabaseFactory {
    constructor() {
    }

    getDataBase(type) {
        switch (type) {
            case "wood":
                return new Datastore({ filename: 'data/WOODS_DETAILS', autoload: true });
                break;
            case "calamina":
                return new Datastore({ filename: 'data/CALAMINAS_DETAILS', autoload: true });
                break;
            case "ironmongery":
                return new Datastore({ filename: 'data/IRONMONGERY_DETAILS', autoload: true });
                break;
            default:
                return "that database doesnt exist!";
                break;
        }
    }
}

module.exports = DatabaseFactory;