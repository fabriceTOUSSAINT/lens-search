import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import './styles.css';

export const GET_ALL_LENS_NAMES = gql`
    query allLens {
        lens_name
        lens_mount
        lens_brand
        msrp
    }
`;

const SearchBar: React.FC = (): any => {
    // const { options, value } = props;
    const { data, loading, error } = useQuery(GET_ALL_LENS_NAMES);
    if (loading) return <div>Loading...</div>
    if (error) return console.log(error)
    
    console.log(data, '<<<<');
    return (
        <Fragment>
            <input placeholder="Type in a lens" />
        </Fragment>
        
    )
}

export default SearchBar;