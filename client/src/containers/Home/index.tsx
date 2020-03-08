import React from 'react';
import SearchBar from '../../components/SearchBar';
import PhotoCarousel from '../../components/PhotoCarousel';
import styled from 'styled-components';

const Home: React.FC = (props: any) => {
    return (
        <HomeWrapper>
            <HomeTitle> Lens Jawn</HomeTitle>
            <SearchBar />
            <PhotoCarousel />
        </HomeWrapper>
    )
}

export default Home;

const HomeWrapper = styled.div`
    max-width: 750px;
`

const HomeTitle = styled.h1`
color: white;
font-size: 3em;
display: block;
text-align: center;
width: 100%;
`