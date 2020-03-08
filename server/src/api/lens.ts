// @ts-nocheck
import { SQLDataSource } from 'datasource-sql';

class LensAPI extends SQLDataSource {
    async getAllLensName() {
        // TODO: revisit when I actually figure out shape and create db.
        const data = await this.knex
            .select("lens_name")
            .from("lens")
            .cache(60);

        return data;
    }

    async getAllLens() {
        // TODO: revisit when I actually figure out shape and create db.
        const data = await this.knex
            .select("*")
            .from("lens")
            .cache(60);

        return data;
    }

}

export default LensAPI;