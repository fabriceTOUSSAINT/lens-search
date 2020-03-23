import React, { useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PhotoCarousel from '../../components/PhotoCarousel'
import styled from 'styled-components'

import { useQuery, gql } from '@apollo/client'

const App: React.FC = () => {
  return (
    <AppWrapper>
      <HomeWrapper>
        <HomeTitle> Lens Jawn</HomeTitle>
        <SearchBar />
        <PhotoCarousel />
      </HomeWrapper>
    </AppWrapper>
  )
}

export default App

const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 1100px;
`
const HomeWrapper = styled.div`
  max-width: 750px;
  width: 50vw;
`

const HomeTitle = styled.h1`
  color: white;
  font-size: 3em;
  display: block;
  text-align: center;
  width: 100%;
`
