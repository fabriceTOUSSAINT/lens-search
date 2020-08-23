import { gql } from 'apollo-server';

const typeDefs = gql`
  type Raw {
    _content: String
  }

  type EXIF {
    tagspace: String
    tagspaceid: Int
    tag: String
    label: String
    raw: Raw
  }

  type Photo {
    thumbnail: String
    imageUrl: String
    imageUrlLarge: String
    exif: [EXIF]
    id: Int
  }

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

  input LensInput {
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

  type Query {
    photosShotWith(lensName: String): [Photo]
    getLens(lensName: String): Lens
    getAllLens: [Lens]
  }
`;

export default typeDefs;
