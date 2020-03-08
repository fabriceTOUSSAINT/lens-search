import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App/App';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import GlobalStyle from './GlobalStyle';

const cache: any = new InMemoryCache();

const client = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: 'http://localhost:4000/',
    })
});


// Errors out here, but idk why
// cache.writeData({
//     lens: {
//       f_stop_max: '',
//     }
// });


ReactDOM.render(
    <ApolloProvider client={client}>
        <GlobalStyle />
        <App />
    </ApolloProvider>, document.getElementById('root'));
