import React from 'react';
import * as Flickr from '../../utils/flickr';

// import Flickr from 'flickrapi';

// import React, {PropTypes} from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as actions from '../../actions/fuelSavingsActions';



// import ImageCarousel from '../ImageCarousel/ImageCarousel';

class SearchBar extends React.Component{

  static propTypes = {
    callback: React.PropTypes.func.isRequired
  };

  constructor(props){
    super(props);

    // this.jsonFlickrApi = this.jsonFlickrApi.bind(this);
    // this.showPhotos = this.showPhotos.bind(this);
    // this.Flickr = this.Flickr.bind(this);
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
    e.preventDefault();
    // this.setState({searchTerm: this.state.searchString});
    const searchString = this.state.searchString;

    // let page = this.state.page;
    // let page = 0;

    if(searchString.length === 0){
      alert('Error: this field is required');
    }

    // page = page > 0 ? page : 1;
    debugger;
    const flickrResults = Flickr.searchText(searchString);
    // const test = Flickr.searchText({
    //   text: searchString,
    //   per_page: 20,
    //   // jsoncallback: 'this.showPhotos()',
    //   // jsoncallback: 'this.props.callback()',
    //   page: page
    // });
    console.warn({flickrResults});

    this.props.callback('Hello Search Results');
  }

 // jsonFlickrApi(response) {
 //   console.warn({response});
 // }
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
              onChange={this.handleChange}
              required  />
            <input type="submit" value="Search" />
          </form>
          {/* <h3>{this.state.searchString}</h3> */}
        </div>

        {/* <ImageCarousel
          lens={this.state.searchTerm}
        /> */}

      </div>
    );
  }
}

export default SearchBar;
