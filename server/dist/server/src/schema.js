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
exports.default = typeDefs;
