// @flow
//TODO: REMOVE THIS FILE 
import React, {Component} from 'react';

import App from 'universal/components/App/App';

type Props = {
  children: any;
};

class AppContainer extends Component {

  props: Props;

  render () {
    return (
      <App {...this.props}/>
    );
  }
}

export default AppContainer;
