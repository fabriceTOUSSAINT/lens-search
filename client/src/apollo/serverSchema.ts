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

export const PHOTOS_SHOT_WITH = gql`
  query PhotosShotWith($lens: LensInput) {
    photosShotWith(lens: $lens) {
      thumbnail
      imageUrl
      imageUrlLarge
      exif
      id
    }
  }
`
