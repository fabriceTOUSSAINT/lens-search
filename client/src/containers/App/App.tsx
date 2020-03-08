import React, { useEffect } from 'react';
import Home from '../Home';
import styled from 'styled-components';

import {useQuery, gql } from '@apollo/client';


const App: React.FC = () => {
  return (
    <AppWrapper>
      <Home />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 1100px;
`