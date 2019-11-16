import { DataSource } from 'apollo-datasource';
// import lensDB from '../../../db/lens_db.json';
import lensDB from '../MOCK_DB';

class LensAPI extends DataSource {
    store: any;
    context: any;

    constructor() {
        super();

        // Get access to some store/database
        // this.store = store;
    }

    initialize(config: any) {
        this.context = config.context;
    }

    async getAllLensName() {
        // console.log(lensDB)
        return lensDB;
    }

}

export default LensAPI;