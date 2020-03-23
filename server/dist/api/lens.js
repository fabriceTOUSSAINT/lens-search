"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_sql_1 = require("datasource-sql");
const camelize_1 = __importDefault(require("camelize"));
class LensAPI extends datasource_sql_1.SQLDataSource {
    construct() {
        this.dbName = 'lens';
    }
    async getAllLensName() {
        const data = await this.knex
            .select('lens_name')
            .from(this.dbName)
            .cache(60);
        return data;
    }
    async getLens(lensName) {
        console.log(lensName, 'laksdjfa;lj', this.dbName);
        const data = await this.knex.select('*').from(this.dbName);
        console.log(data, '<<<');
        return data[0];
    }
    async getAllLens() {
        const data = await this.knex
            .select('*')
            .from(this.dbName)
            .cache(60);
        console.log(data, '<<<<< data jawn');
        return camelize_1.default(data);
    }
}
exports.default = LensAPI;
