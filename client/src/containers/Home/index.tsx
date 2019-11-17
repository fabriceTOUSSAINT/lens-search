import React from 'react';
import SearchBar from '../../components/SearchBar';
import PhotoCarousel from '../../components/PhotoCarousel';

import './styles.css';

const Home: React.FC = (props: any) => {
    return (
        <div className="home">
            <h1 className='title'> Lens Jawn</h1>
            <SearchBar />
            <PhotoCarousel />
        </div>
    )
}

export default Home;