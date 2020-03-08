//@ts-nocheck
import React from 'react';
import { useQuery } from '@apollo/client';

import { Typeahead } from 'react-bootstrap-typeahead';

import Select from 'react-select';
// Import as a module in your JS
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Schemas
import { GET_LIST_OF_ALL_LENS_NAME } from '../../schemas';

import './styles.css';
const SearchBar: any = () => {
    const { data, loading, error } = useQuery(GET_LIST_OF_ALL_LENS_NAME);
    if (loading) return <>'Search is loading'</>
    else if (error) {
        console.error('An error occured: ', error)
        return;
    }


    console.log(data, '<<< data in search');

    const defaultTypeaheadProps = {
        type:"search",
        name:"query",
        id:"query",
        placeholder:"eg. XF23mmF1.4 R",
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