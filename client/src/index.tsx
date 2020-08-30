import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import { ApolloClient, HttpLink, ApolloProvider } from '@apollo/client';
import GlobalStyle from './GlobalStyle';
import { cache } from './store';

// Store
import { AppStoreActions } from './store/app.actions';
import { typeDefs } from './store/app.graphql';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
  cache,
  typeDefs,
});

AppStoreActions.setSelectedLens({
  fStopMax: '',
  fStopMin: '',
  lensType: '',
  lensMount: '',
  dpReviewLink: '',
  focalLength: '',
  yearReleased: '',
  lensBrand: '',
  msrp: '',
  msrp_002: '',
  lensName: '',
});
// cache.writeQuery({
//   query: GET_SELECTED_LENS,
//   data: {
//     getSelectedLens: {
//       fStopMax: '',
//       fStopMin: '',
//       lensType: '',
//       lensMount: '',
//       dpReviewLink: '',
//       focalLength: '',
//       yearReleased: '',
//       lensBrand: '',
//       msrp: '',
//       msrp_002: '',
//       lensName: '',
//     },
//   },
// });

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
