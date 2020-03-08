import { gql } from '@apollo/client';


export const GET_LIST_OF_ALL_LENS_NAME = gql`
  query getAllLensName {
    allLens {
      lens_name
    }
  }
`;