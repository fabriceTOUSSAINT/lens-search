//@ts-nocheck
import React from 'react';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import Select from 'react-select';

// Schemas
import { GET_LIST_OF_ALL_LENS_NAME } from '../../apollo/serverSchema';

const SearchBar: any = () => {
    const { data, loading, error } = useQuery(GET_LIST_OF_ALL_LENS_NAME);
    if (loading) return <>'Search is loading'</>
    else if (error) {
        console.error('An error occured: ', error)
        return;
    }

    const setSearch = (e) => {
        console.log('opetio nselected', e)
    }
    
    const inputLensSelection = data?.allLens.map((lens) => {
        return {
            value: lens.lens_name,
            label: lens.lens_name
        }
    });
    // TODO: connect this to actually trigginger flickr api call
    // TODO: fix this, wildly ineficcient
    return (
        <>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={'Lens loading'}
                isDisabled={false}
                isLoading={loading}
                isClearable={true}
                isRtl={false}
                isSearchable={true}
                name="color"
                options={inputLensSelection}
                isOptionSelected={setSearch}
            />
        </>
    )
}

export default SearchBar;
  