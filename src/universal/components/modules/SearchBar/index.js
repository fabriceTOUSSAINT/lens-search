// @flow
import React from 'react';
// import * as Flickr from '../../utils/flickr';

type Props = {
  callback: () => void
}

type State = {
  searchString: string,
  page: number
}

class SearchBar extends React.Component{
  state: State = {
    searchString: 'XF23mmF1.4 R',
    page: 1
  };

  props: Props;

  handleChange = (e: any) => {
    this.setState({searchString: e.target.value});
  }

  searchPhotos = (e: any) => {
    e.preventDefault();

    // FIXME Dynamically pull search string from user input
    const searchPhotoMethod = 'flickr.photos.search';
    const searchString = this.state.searchString;

    if(searchString.length === 0){
      alert('Error: this field is required');
    }
    console.log(searchString);
    // Flickr.searchPhotoApi(searchString, searchPhotoMethod, null, this.props.callback);

  }

  render(){
    return (
      <div className="main-page">
        <div className="search-block">
          <form className="search-form" id="search-form" onSubmit={this.searchPhotos} >
            {/* <label htmlFor="query">Search:</label> */}
            <input
              type="search"
              name="query"
              id="query"
              placeholder="eg. XF23mmF1.4 R"
              value={this.state.searchString}
              onChange={this.handleChange}//use this for auto complete
              required  />
            <input type="submit" value="Search" />
          </form>
        </div>

        <h1>{this.state.searchString}</h1>
      </div>
    );
  }
}

export default SearchBar;
