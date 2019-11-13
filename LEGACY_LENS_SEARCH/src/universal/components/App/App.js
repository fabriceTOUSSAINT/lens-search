import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './style.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  };

  render () {
    return (
      <div className='app'>
        {this.props.children}
      </div>
    );
  }
}

export default App;
