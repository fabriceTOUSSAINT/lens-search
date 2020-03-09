import { gql } from '@apollo/client';


export const GET_LIST_OF_ALL_LENS_NAME = gql`
  query getAllLensName {
    allLens {
      lens_name
    }
  }
`;

export const GET_LENS = gql`
    query GetLens($lensName: String) {
        getLens(lensName: $lensName) {
            f_stop_max
            f_stop_min
            lens_type
            lens_mount
            dp_review_link
            focal_length
            dp_lens_detail_link
            year_released
            lens_brand
            msrp
            lens_name
            msrp__002
        }
    }
`;

export const PHOTOS_SHOT_WITH = gql`
    query PhotosShotWith($lensName: String) {
        photosShotWith(lensName: $lensName) {
            thumbnail
            imageUrl
            imageUrlLarge
            exif
            id
        }
    }
`;