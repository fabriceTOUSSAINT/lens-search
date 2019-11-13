import { sharedActions } from '../actions/sharedActions';

export default (state = '', action) => {
    switch(action.type) {
    case sharedActions.SEARCH_TERM_UPDATE:
        return action.payload;
    default:
        return state;
    }
}
