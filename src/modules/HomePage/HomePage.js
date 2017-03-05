import React from 'react';
import {Link} from 'react-router';
import SearchBar from '../SearchBar/SearchBar';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };

    this.updatePhotoState = this.updatePhotoState.bind(this);
  }


  updatePhotoState(photos) {
    // I want to add to state because i will include 500px
    // For every new search wipe clean with new search results. 
    this.setState({
      photos: [...photos]
    });
  }

  render() {
    return (
      <div>
        <h1>Lens Search</h1>
        <h2>Get Started</h2>
        <ol><li>Review the <Link to="lens-search">my Jawn</Link></li></ol>

        <SearchBar callback={this.updatePhotoState}/>
        <ImageCarousel photos={this.state.photos} />
      </div>
    );
}
}

export default HomePage;
