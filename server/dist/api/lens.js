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
    async getAllLens() {
        const data = await this.knex
            .select("*")
            .from("lens")
            .cache(60);
        return data;
    }
}
exports.default = LensAPI;
