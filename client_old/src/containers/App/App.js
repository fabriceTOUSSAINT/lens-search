import React from 'react';

import './styles.scss';

function App(props) {
  return (
    <div className="app">
       {props.children}
    </div>
  );
}

export default App;
