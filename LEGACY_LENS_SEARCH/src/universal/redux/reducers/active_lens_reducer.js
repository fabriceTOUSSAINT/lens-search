import { sharedActions } from '../actions/sharedActions';

export default (state = {}, action) => {
    switch(action.type) {
    case sharedActions.ACTIVE_LENS_DETAIL:
        return action.payload;
    default:
        return state;
    }
}
