import React from 'react';
import axios from 'axios';
import * as Flickr from '../../utils/flickr';

class SearchBar extends React.Component{

  static propTypes = {
    callback: React.PropTypes.func.isRequired
  };

  constructor(props){
    super(props);


    this.searchPhotos = this.searchPhotos.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchString: 'fuji xf 23mm',
      page: 1
    };
  }

  handleChange(e) {
    this.setState({searchString: e.target.value});
  }

  searchPhotos(e) {
    // FIXME Dynamically pull search string from user input 
    const searchPhotoMethod = 'flickr.photos.search';
    // let photoIdArray = null;

    e.preventDefault();
    const searchString = this.state.searchString;


    if(searchString.length === 0){
      alert('Error: this field is required');
    }
    Flickr.searchPhotoApi(searchString, searchPhotoMethod, null, this.props.callback);

  }

  // showPhotos(data){
  //   console.log('uh hi?');
  //   console.log({data});
  //   // gallery = new Gallery(data.photos.photo, document.getElementById('gallery-image'));
  //   // gallery.createThumbnailsGallery(document.getElementById('thumbnail_list'));
  // }

  render(){
    return (
      <div className="main-page">
        <div className="search-block">
          <form className="search-form" id="search-form" onSubmit={this.searchPhotos} >
            <label htmlFor="query">Search:</label>
            <input
              type="search"
              name="query"
              id="query"
              placeholder="eg. Fuji xf 23mm"
              value={this.state.searchString}
              onChange={this.handleChange}//use this for auto complete
              required  />
            <input type="submit" value="Search" />
          </form>
          {/* <h3>{this.state.searchString}</h3> */}
        </div>
      </div>
    );
  }
}

export default SearchBar;
