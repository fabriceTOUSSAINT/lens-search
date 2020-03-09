import {gql} from '@apollo/client';

export const typeDefs = gql`
    type Lens {
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

    extend type Query {
        getSelectedLens: Lens
    }
`;

export const resolvers = {};

export const GET_SELECTED_LENS = gql`
    query GetSelectedLens {
        getSelectedLens @client {
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
`