import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Lens {
    fStopMax: String
    fStopMin: String
    lensType: String
    lensMount: String
    dpReviewLink: String
    focalLength: String
    yearReleased: String
    lensBrand: String
    msrp: String
    msrp_002: String
    lensName: String
  }

  extend type Query {
    getSelectedLens: Lens
  }

  extend type Mutation {
    updateSelectedLens(lens: Lens): Lens
  }
`

export const resolvers = {
  Mutation: {
    updateSelectedLens: (parent: any, args: any, context: any) => {
      context.cache.writeQuery({
        query: GET_SELECTED_LENS,
        data: {
          getSelectedLens: args.lens,
        },
      })
    },
  },
}

export const UPDATE_SELECTED_LENS = gql`
  mutation UpdateSelectedLens($lens: Lens) {
    updateSelectedLens(lens: $lens) @client {
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
`

export const GET_SELECTED_LENS = gql`
  query GetSelectedLens {
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
`
