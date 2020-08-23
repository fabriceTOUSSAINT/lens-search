//@ts-nocheck
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useLazyQuery } from '@apollo/client';
import styled from 'styled-components/macro';

import Select from 'react-select';

// Schemas
import { GET_ALL_LENS_NAMES, GET_LENS } from '../../apollo/serverSchema';
import { UPDATE_SELECTED_LENS } from '../../apollo/localSchema';

interface SelectOptions {
  value: string;
  label: string;
}

const SearchBar: any = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [lensList, setLensList] = useState<SelectOptions[]>([
    {
      value: '',
      label: '',
    },
  ]);

  const [updateCurrentLens] = useMutation(UPDATE_SELECTED_LENS);
  const { data: allLensData, loading, error } = useQuery(GET_ALL_LENS_NAMES);
  const [getLens] = useLazyQuery(GET_LENS, {
    onCompleted: ({ getLens }) => {
      updateCurrentLens({
        variables: {
          lens: getLens,
        },
      });
    },
  });

  const setSearch = (optionSelected: any) => {
    getLens({
      variables: {
        lensName: optionSelected.value,
      },
    });
  };

  useEffect(() => {
    // TODO: TEMP, testing, just auto search on reload
    setSearch({ value: 'Fujifilm XF 23mm F1.4 R' });
    // setSearch({ value: 'Canon EF 70-200mm f/2.8L USM' })
  }, []);

  useEffect(() => {
    if (allLensData?.getAllLens) {
      const inputLensSelection = allLensData.getAllLens.map(
        (lens): SelectOptions => {
          return {
            value: lens.lensName,
            label: lens.lensName,
          };
        },
      );

      setLensList(inputLensSelection);
    }
  }, [allLensData?.getAllLens]);

  return (
    <SearchBarWrapper>
      <StyledSelect
        isLoading={loading}
        isSearchable={true}
        options={lensList}
        placeholder={lensList[0].value}
        onChange={setSearch}
        inputValue={inputValue}
        onInputChange={setInputValue}
        menuIsOpen={inputValue.length >= 2}
      />
    </SearchBarWrapper>
  );
};

export default SearchBar;

const StyledSelect = styled(Select)`
  width: 500px;
`;

const SearchBarWrapper = styled.div`
  background: #fed35d;
  padding: 25px 80px;
`;
