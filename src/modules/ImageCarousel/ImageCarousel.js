import React from 'react';
import * as Flickr from '../../utils/flickr';

class ImageCarousel extends React.Component {

  static propTypes = {
    photoIds: React.PropTypes.func
  };

  constructor(props){
    super(props);

  }

  render(){
    return (
      <div>{this.props.lens}</div>
    );
  }
}

ImageCarousel.propTypes = {
  lens: React.PropTypes.string.isRequired
};

export default ImageCarousel;
