import React from 'react';

class ImageCarousel extends React.Component {
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
