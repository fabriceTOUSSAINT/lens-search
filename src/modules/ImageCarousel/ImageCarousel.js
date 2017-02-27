import React from 'react';
import * as Flickr from '../../utils/flickr';

class ImageCarousel extends React.Component {

  static propTypes = {
    photos: React.PropTypes.array
  };

  constructor(props){
    super(props);
  }


  render(){
    return (
      <div className="container">
        <div className="row">
          {this.props.photos.map((photo, index) => {
            return (
              <img
                className='photoGallery'
                key={index}
                src={Flickr.buildPhotoUrl(photo)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}


export default ImageCarousel;
