import React from 'react';
import SearchBar from '../../components/SearchBar';
import PhotoCarousel from '../../components/PhotoCarousel';
import styled from 'styled-components';
import defaultBackground from '../../assets/lens_jawn_bg.jpg';

const App: React.FC = () => {
  return (
    <AppWrapper>
      <HeroWrapper bg={defaultBackground}>
        <HomeTitle> Lens Jawn</HomeTitle>
        {/* <img src={defaultBackground} /> */}
        <SearchBar />
      </HeroWrapper>
      <PhotoCarousel />
    </AppWrapper>
  );
};

export default App;

const HeroWrapper = styled.div<{ bg: any }>`
  background: blue;
  width: 100%;
  height: 80vh;
  background: url(${({ bg }: any) => bg});
  background-size: cover;
  background-position: center;
`;

const AppWrapper = styled.div`
  width: 100vw;
  height: auto;
`;

const HomeTitle = styled.h1`
  color: white;
  font-size: 3em;
  display: block;
  text-align: center;
  width: 100%;
  margin-top: 0;
`;
