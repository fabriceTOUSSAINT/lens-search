const { gql } = require('apollo-server');

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
        name: String
    }

    type Query {
        photosShotWith(lens: String): String
    }
`;

module.exports = typeDefs;
