"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_1 = require("apollo-datasource");
const lens_db_1 = __importDefault(require("../../../db/lens_db"));
class LensAPI extends apollo_datasource_1.DataSource {
    constructor() {
        super();
    }
    initialize(config) {
        this.context = config.context;
    }
    async getAllLensName() {
        return lens_db_1.default;
    }
}
exports.default = LensAPI;
