import React from 'react';
// import {lory} from 'lory.js';
import * as Flickr from '../../utils/flickr';

class ImageCarousel extends React.Component {

  static propTypes = {
    photos: React.PropTypes.array
  };

  constructor(props){
    super(props);

    this.buildCarousel = this.buildCarousel.bind(this);
    // document.addEventListener('DOMContentLoaded', () => {
    //   this.variableWidth = document.querySelector('.js_variablewlidth');
    // });
  }

  buildCarousel() {

    // lory(variableWidth, {
    //     rewind: true
    // });
  }


  render(){
    return (
      <div className="slider js_variablewlidth">
        <div className="frames js_frame">
          <ul className="slides js_slides">
            {this.props.photos.map((photo, index) => {
              return (
                <li key={index} className="js_slide">
                  <img
                    className="photo"
                    src={Flickr.buildPhotoUrl(photo)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <span className="js_prev prev">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#2E435A" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g></svg>
        </span>
        <span className="js_next next">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#2E435A" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g></svg>
        </span>
      </div>
    );
  }
}


export default ImageCarousel;
