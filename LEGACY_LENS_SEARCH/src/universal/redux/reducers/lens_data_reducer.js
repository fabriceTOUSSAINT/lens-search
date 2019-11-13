import { sharedActions } from '../actions/sharedActions';
const lensDB = require('../../config/lens_db.json');

export default (state = lensDB, action) => {
    switch (action.type) {
        case sharedActions.LOCAL_LENS_DATA:
            return action.payload;
        default:
            return state;
    }
}


