import { sharedActions } from '../actions/sharedActions';

export default (state = null, action) => {
    switch (action.type) {
        case sharedActions.POPULATE_LENS_DATA:
            return action.payload;
        default:
            return state;
    }
}
