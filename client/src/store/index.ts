import { InMemoryCache } from '@apollo/client';
import { AppTypePolicies } from './app.actions';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      ...AppTypePolicies.Query,
    },
  },
});
