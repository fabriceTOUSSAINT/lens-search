import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';

import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from 'react-router-redux';

import logger from 'redux-logger';

import * as Reducers from './reducers/index.js';
import photos_info_reducer from './reducers/photos_info_reducer';
import search_term_reducer from './reducers/search_term_reducer';
import lens_data_reducer from './reducers/lens_data_reducer';
import active_lens_reducer from './reducers/active_lens_reducer';

export default (history) => {
  const middleware = [routerMiddleware(history), logger];

  const store = createStore(combineReducers({
    activeLens: active_lens_reducer,
    searchTerm: search_term_reducer,
    photoSetData: photos_info_reducer,
    localLensData: lens_data_reducer,
    router: routerReducer,
  }), applyMiddleware(...middleware));


  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
     module.hot.accept('./reducers', () => {
       const nextReducers = require('./reducers/index.js');
       const rootReducer = combineReducers({
         ...nextReducers,
         router: routerReducer
       });

       store.replaceReducer(rootReducer);
     });
   }


  return store;
}
