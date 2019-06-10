const WoodsDatabase = require("./WoodsDatabase");
const CalaminasDataBase = require("./CalaminasDatabase");
const IronmongeryDatababase = require("./IronmongeryDatabase");


class DatabaseFactory {
    constructor() {
    }

    getDataBase(type) {
        switch (type) {
            case "wood":
                return new WoodsDatabase();
                break;
            case "calamina":
                return new CalaminasDataBase();
                break;
            case "ironmongery":
                return new IronmongeryDatababase();
                break;
            default:
                return "that database doesnt exist!";
                break;
        }
    }
}

module.exports = DatabaseFactory;