import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App/App'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client'
import { typeDefs, resolvers, GET_SELECTED_LENS } from './apollo/localSchema'
import GlobalStyle from './GlobalStyle'

const cache: any = new InMemoryCache()

const client = new ApolloClient({
  cache,
  typeDefs,
  resolvers,
  link: new HttpLink({
    uri: 'http://localhost:4000/',
  }),
})

cache.writeQuery({
  query: GET_SELECTED_LENS,
  data: {
    getSelectedLens: {
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
    },
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalStyle />
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
