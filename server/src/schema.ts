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

    # type Lens {
    #     fStopMax: String
    #     fStopMin: String
    #     lensType: String
    #     lensMount: String
    #     dpReviewLink: String
    #     focalLength: String
    #     yearReleased: [String]
    #     lensBrand: String
    #     msrp: [String]
    #     lensName: String
    # }

    # This is how Lens looks in json file, idk which one I like more.
    type Lens {
        f_stop_max: String
        f_stop_min: String
        lens_type: String
        lens_mount: String
        dp_review_link: String
        focal_length: String
        dp_lens_detail_link: String
        year_released: String
        lens_brand: String
        msrp: String
        lens_name: String
        msrp__002: String
    }

    type LensName {
        lens_name: String
    }

    type Query {
        photosShotWith(lensName: String): [Photo]
        getLens(lensName: String): Lens,
        allLens: [Lens],
        allLensName: [LensName]
    }
`;

export default typeDefs;
