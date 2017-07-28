import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router-dom';

// Components
import SearchBar from '../modules/SearchBar';

import './style.scss';

class Home extends Component {
  render () {
    return (
      <div className='home'>
        <h1 className='title'>⚡ Lens search ⚡</h1>
        <SearchBar />
      </div>
    );
  }
}

export default Home;
