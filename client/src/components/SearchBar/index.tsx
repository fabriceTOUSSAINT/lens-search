//@ts-nocheck
import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';

import Select from 'react-select';

// Store
import { AppStoreActions } from '../../store/app.actions';

// Schemas
import {
  useGetAllLensNamesQuery,
  useGetLensLazyQuery,
  usePhotosShotWithLazyQuery,
  useStoreSelectedLensQuery,
} from '../../generated/globalTypes';

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

  const [
    lazyFetchPhotos,
    { data, loading: photosLoading },
  ] = usePhotosShotWithLazyQuery();
  const { data: currentLensSelected } = useStoreSelectedLensQuery();
  const { data: allLensData, loading, error } = useGetAllLensNamesQuery();
  const [getLens] = useGetLensLazyQuery({
    onCompleted: ({ getLens }) => {
      console.log({ getLens });
      AppStoreActions.setSelectedLens({ ...getLens });
    },
  });

  const setSearch = (optionSelected: any) => {
    getLens({
      variables: {
        lensName: optionSelected.value,
      },
    });
  };

  const searchForPhotos = () => {
    console.log({ currentLensSelected });
    lazyFetchPhotos({
      variables: {
        lensName: currentLensSelected?.getSelectedLens.lensName,
      },
    });
  };
  console.log({ data });

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
      <SearchButton onClick={searchForPhotos}>Refetch photos</SearchButton>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchButton = styled.button``;
const StyledSelect = styled(Select)`
  width: 500px;
`;

const SearchBarWrapper = styled.div`
  background: #fed35d;
  padding: 25px 80px;
`;
