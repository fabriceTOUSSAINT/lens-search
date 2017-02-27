import React from 'react';
import axios from 'axios';
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
    this.checkExifForLensModel = this.checkExifForLensModel.bind(this);
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

  checkExifForLensModel(searchString, resPhotoIds, cb) {
    const searchMethod = 'flickr.photos.getExif';
    // let photosShotWithLens = [];
// debugger;
    //FIXME: Hard code autocomplete of search string until i write those functions
    searchString = 'XF23mmF1.4 R';

    // Create an array of Flickr api Urls to later use to fetch data
    // on individual photos
    const exifApiUrl = resPhotoIds.map((photo) => {
      return Flickr.searchPhotoApi(searchString, searchMethod, photo.id);
    });

    exifApiUrl.map((exifUrl) => {
      return axios.get(exifUrl)
      .then((res) => {
        if (res.data.stat !== 'fail') {
          res.data.photo.exif.map((tag) => {
            if (tag.tag === 'LensModel') {
              if (searchString === tag.raw._content){
                cb(res.data.photo);
              }
            }
          });
        }
      })
      .catch((err) => {
        return err;
      });
    });
  }

  searchPhotos(e) {
    const searchPhotoMethod = 'flickr.photos.search';
    // let photoIdArray = null;

    e.preventDefault();
    const searchString = this.state.searchString;


    if(searchString.length === 0){
      alert('Error: this field is required');
    }

    const searchPhotoApi = Flickr.searchPhotoApi(searchString, searchPhotoMethod);
    // const searchExifApi = Flickr.searchPhotoApi(searchString, searchExifMethod);

    //Search Flickr Api
    const _self = this;
    axios.get(searchPhotoApi)
      .then((response) => {
        // this.props.callback(response.data.photos.photo);
        this.checkExifForLensModel(searchString, response.data.photos.photo, _self.props.callback);
      })
      .catch(function (error) {
        return error;
      });
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
