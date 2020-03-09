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

    async getLens(lensName: string) {
        console.log(lensName)
        const data = await this.knex
            .select("*")
            .from("lens")
            .where({
                lens_name: lensName,
            });
 // TODO: Why does knex respond in an array?
            console.log(data, '<<<')
        return data[0];
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