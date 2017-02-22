import React from 'react';
import {Link} from 'react-router';
import SearchBar from '../SearchBar/SearchBar';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: null
    };
  }

  updatePhotoState(results) {
    console.warn(results);
    // this.setState({results});
  }

  render() {
    return (
      <div>
        <h1>Lens Search</h1>
        <h2>Get Started</h2>
        <ol><li>Review the <Link to="lens-search">my Jawn</Link></li></ol>

        <SearchBar callback={this.updatePhotoState}/>
      </div>
    );
}
}

export default HomePage;
