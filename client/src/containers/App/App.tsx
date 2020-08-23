import React from 'react';
import PhotoCarousel from '../../components/PhotoCarousel';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar';
import Hero from '../Hero';

const App: React.FC = () => {
  return (
    <AppWrapper>
      <Hero />
      <SearchBar />
      <PhotoCarousel />
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  width: 100vw;
  height: auto;
`;
