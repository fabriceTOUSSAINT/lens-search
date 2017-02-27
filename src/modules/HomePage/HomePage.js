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

    let temp =[photos];
    if(!this.state.photos) {
      return this.setState({photos});
    }
    else {
      let flickrImages = this.state.photos.concat(temp);
      this.setState({photos: flickrImages});
    }
    // console.warn(photoIds);
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
