import React from 'react';
import Flickr from 'flickrapi';

// import React, {PropTypes} from 'react';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import * as actions from '../../actions/fuelSavingsActions';

// import Flickr from '../../utils/flickr';

// import ImageCarousel from '../ImageCarousel/ImageCarousel';

class SearchBar extends React.Component{

  static propTypes = {
    callback: React.PropTypes.func.isRequired
  };

  constructor(props){
    super(props);
    this.Flickr = Flickr;

    // this.jsonFlickrApi = this.jsonFlickrApi.bind(this);
    // this.showPhotos = this.showPhotos.bind(this);
    this.searchPhotos = this.searchPhotos.bind(this);
    // this.handleChange = this.handleChange.bind(this);

    // this.state = {
    //   searching: 'fuji xf 23mm',
    //   searchTerm: 'fuji xf 23mm',
    //   page: 1
    // };
  }

  // handleChange(e) {
  //   this.setState({searching: e.target.value});
  // }

  searchPhotos(e) {
    e.preventDefault();
    // this.setState({searchTerm: this.state.searching});

    // const lastSearch = this.state.searchTerm;
    // let page = this.state.page;
    //
    // if(lastSearch.length === 0){
    //   alert('Error: this field is required');
    // }
    // page = page > 0 ? page : 1;
    // this.Flickr.searchText({
    //   text: lastSearch,
    //   per_page: 6,
    //   jsoncallback: 'this.showPhotos()',
    //   page: page
    // });

    this.props.callback('Hello Search Results');
   console.log('kljhlkh;');
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
              // value={this.state.searching}
              // onChange={this.handleChange}
              required  />
            <input type="submit" value="Search" />
          </form>
          {/* <h3>{this.state.searching}</h3> */}
        </div>

        {/* <ImageCarousel
          lens={this.state.searchTerm}
        /> */}

      </div>
    );
  }
}

export default SearchBar;
