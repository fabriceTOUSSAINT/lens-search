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
import lens_info_reducer from './reducers/lens_info_reducer';
import search_term_reducer from './reducers/search_term_reducer';

export default (history) => {
  const middleware = [routerMiddleware(history), logger];

  const store = createStore(combineReducers({
    searchTerm: search_term_reducer,
    lens_info: lens_info_reducer,
    router: routerReducer
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
