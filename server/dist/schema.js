"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
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
    type LensDB {
        f_stop_max: String
        f_stop_min: String
        lens_type: String
        lens_mount: String
        dp_review_link: String
        focal_length: String,
        dp_lens_detail_link: String,
        year_released: String
        lens_brand: String
        msrp: String
        lens_name: String
        msrp__002: String
    }


    type Query {
        photosShotWith(lensName: String): [Photo]
        allLens: [LensDB],
        allLensName: [LensDB]
    }
`;
exports.default = typeDefs;
