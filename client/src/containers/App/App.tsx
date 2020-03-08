import React, { useEffect } from 'react';
import Home from '../Home';
import {useQuery, gql } from '@apollo/client';


import './App.css';


const App: React.FC = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
