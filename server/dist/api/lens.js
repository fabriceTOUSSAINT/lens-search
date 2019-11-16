"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_1 = require("apollo-datasource");
const MOCK_DB_1 = __importDefault(require("../MOCK_DB"));
class LensAPI extends apollo_datasource_1.DataSource {
    constructor() {
        super();
    }
    initialize(config) {
        this.context = config.context;
    }
    async getAllLensName() {
        return MOCK_DB_1.default;
    }
}
exports.default = LensAPI;
