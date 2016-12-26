import React from 'react';
import {Link} from 'react-router';
import SearchBar from '../SearchBar/SearchBar';

const HomePage = () => {
  return (
    <div>
      <h1>Lens Search</h1>

      <h2>Get Started</h2>
      <ol>
        <li>Review the <Link to="lens-search">my Jawn</Link></li>
      </ol>

      <SearchBar />
    </div>
  );
};

export default HomePage;
