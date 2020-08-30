import React, { useEffect } from 'react';
import PhotoCarousel from '../../components/PhotoCarousel';
import styled from 'styled-components';
import SearchBar from '../../components/SearchBar';
import Hero from '../Hero';

// Apollo
import { usePhotosShotWithQuery } from '../../generated/globalTypes';

const App: React.FC = () => {
  const { data, loading } = usePhotosShotWithQuery();

  useEffect(() => {}, [data]);

  console.log({ loading, data }, '<<< jawn');

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
