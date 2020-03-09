//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import styled from 'styled-components';

import Select from 'react-select';

// Schemas
import { GET_LIST_OF_ALL_LENS_NAME, GET_LENS } from '../../apollo/serverSchema';

const SearchBar: any = () => {
    const [ inputValue, setInputValue] = useState<string>('')
    const [lensList, setLensList] = useState<{
        value: string,
        label: string
    }[]>([{
        value: '',
        label: ''
    }]);

    const { data, loading, error } = useQuery(GET_LIST_OF_ALL_LENS_NAME);
    const [ getLens, {data: getLensData }] = useLazyQuery(GET_LENS);

    const setSearch = (optionSelected: any) => {
        console.log( optionSelected.value)

        // TODO: updateQuery on response to update @client local current lens call for photos
        getLens({
            variables: {
                lensName: optionSelected.value
            }
        })
    }

    console.log(getLensData, '<<<<<')
    
    useEffect(() => {
        if(data?.allLens) {
            const inputLensSelection = data?.allLens.map((lens) => {
                return {
                    value: lens.lens_name,
                    label: lens.lens_name
                }
            });

            setLensList(inputLensSelection);
        }
    }, [data?.allLens])

    // console.log(inputValue, '<<<',inputValue.length)
    // TODO: connect this to actually trigginger flickr api call
    // TODO: fix this, wildly ineficcient
    return (
        <>
            <Select
                isLoading={loading}
                isSearchable={true}
                options={lensList}
                placeholder={lensList[0].value}
                onChange={setSearch}
                inputValue={inputValue}
                onInputChange={setInputValue}
                menuIsOpen={inputValue.length >= 2}
            />
        </>
    )
}

export default SearchBar;
  