import { gql } from '@apollo/client';

export const typeDefs = gql`
  extend type Query {
    getSelectedLens: Lens!
  }
`;

export const GET_SELECTED_LENS = gql`
  query StoreSelectedLens {
    getSelectedLens @client {
      fStopMax
      fStopMin
      lensType
      lensMount
      dpReviewLink
      focalLength
      yearReleased
      lensBrand
      msrp
      msrp_002
      lensName
    }
  }
`;
