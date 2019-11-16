import { gql } from 'apollo-server';

//TODO: 
const typeDefs = gql`
    type Photo {
        thumbnail: String
        imageUrl: String
        imageUrlLarge: String
        exif: String
        id: Int
    }

    type Lens {
        fStopMax: String
        fStopMin: String
        lensType: String
        lensMount: String
        dpReviewLink: String
        focalLength: String
        yearReleased: [String]
        lensBrand: String
        msrp: [String]
        lensName: String
    }

    type Query {
        photosShotWith(lensName: String): [Photo]
        allLens: [Lens]
    }
`;

export default typeDefs;
