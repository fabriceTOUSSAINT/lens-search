//@ts-nocheck
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/client'
import styled from 'styled-components'

import Select from 'react-select'

// Schemas
import { GET_ALL_LENS_NAMES, GET_LENS } from '../../apollo/serverSchema'
import { UPDATE_SELECTED_LENS } from '../../apollo/localSchema'

const SearchBar: any = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const [lensList, setLensList] = useState<
    {
      value: string
      label: string
    }[]
  >([
    {
      value: '',
      label: '',
    },
  ])

  const [updateCurrentLens] = useMutation(UPDATE_SELECTED_LENS)
  const { data: allLensData, loading, error } = useQuery(GET_ALL_LENS_NAMES)
  const [getLens] = useLazyQuery(GET_LENS, {
    onCompleted: ({ getLens }) => {
      updateCurrentLens({
        variables: {
          lens: getLens,
        },
      })
    },
  })

  const setSearch = (optionSelected: any) => {
    getLens({
      variables: {
        lensName: optionSelected.value,
      },
    })
  }

  useEffect(() => {
    if (allLensData?.getAllLens) {
      const inputLensSelection = allLensData.getAllLens.map(lens => {
        return {
          value: lens.lensName,
          label: lens.lensName,
        }
      })

      setLensList(inputLensSelection)
    }
  }, [allLensData?.getAllLens])

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

export default SearchBar
