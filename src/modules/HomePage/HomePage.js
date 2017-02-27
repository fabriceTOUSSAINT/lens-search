import React from 'react';
import {Link} from 'react-router';
import SearchBar from '../SearchBar/SearchBar';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIds: []
    };

    this.updatePhotoState = this.updatePhotoState.bind(this);
  }


  updatePhotoState(photoIds) {

    let temp =[photoIds];
    if(!this.state.photoIds) {
      return this.setState({photoIds});
    }
    else {
      let flickrImages = this.state.photoIds.concat(temp);
      this.setState({photoIds: flickrImages});
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
        <ImageCarousel photoIds={this.state.photoIds} />
      </div>
    );
}
}

export default HomePage;
