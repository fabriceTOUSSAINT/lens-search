"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_sql_1 = require("datasource-sql");
class LensAPI extends datasource_sql_1.SQLDataSource {
    async getAllLensName() {
        const data = await this.knex
            .select("lens_name")
            .from("lens")
            .cache(60);
        return data;
    }
    async getLens(lensName) {
        console.log(lensName);
        const data = await this.knex
            .select("*")
            .from("lens")
            .where({
            lens_name: lensName,
        });
        console.log(data, '<<<');
        return data[0];
    }
    async getAllLens() {
        const data = await this.knex
            .select("*")
            .from("lens")
            .cache(60);
        return data;
    }
}
exports.default = LensAPI;
