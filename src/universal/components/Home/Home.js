import React, {Component} from 'react';
// import {Link} from 'react-router-dom';

// Components
import SearchBar from '../modules/SearchBar';
import PhotoCarousel from '../modules/PhotoCarousel';

import './style.scss';

class Home extends Component {
  render () {
    return (
      <div className='home'>
        <h1 className='title'>Lens Search</h1>
        <h3 className='title__sub'>See what other photographers create with different lenses</h3>
        <SearchBar />
        <PhotoCarousel />
      </div>
    );
  }
}

export default Home;
