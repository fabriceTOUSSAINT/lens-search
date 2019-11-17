import React from 'react';
import SearchBar from '../../components/SearchBar';
import PhotoCarousel from '../../components/PhotoCarousel';

import './styles.scss';

function Home() {
  return (
    <div className="home">
        <h1 className='title'>⚡ Lens search ⚡</h1>
        <SearchBar />
        <PhotoCarousel />
    </div>
  );
}

export default Home;
