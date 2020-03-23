import { gql } from '@apollo/client'

export const GET_ALL_LENS_NAMES = gql`
  query {
    getAllLens {
      lensName
    }
  }
`

export const GET_LENS = gql`
  query GetLens($lensName: String) {
    getLens(lensName: $lensName) {
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

// TODO: EXIF & id aren't working rn
export const PHOTOS_SHOT_WITH = gql`
  query PhotosShotWith($lensName: String) {
    photosShotWith(lensName: $lensName) {
      thumbnail
      imageUrl
      imageUrlLarge
    }
  }
`
