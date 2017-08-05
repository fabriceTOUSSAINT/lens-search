// @flow
import React from 'react';
import PhotoCarousel from '../PhotoCarousel';

type State = {
  searchString: string,
  currSearchValue: ?any
}

class SearchBar extends React.Component{
  state: State = {
    searchString: 'XF23mmF1.4 R',
    currSearchValue: ''
  };

  handleChange = (e: Object) => {
    e.preventDefault();
    this.setState({currSearchValue: e.target.value});
  }

  setSearch = (e: any) => {
    e.preventDefault();
    this.setState({ searchString: this.state.currSearchValue});
  }

  render(){
    return (
      <div className="main-page">
        <div className="search-block">
          <form className="search-form" id="search-form" onSubmit={this.setSearch} >
            <input
              type="search"
              name="query"
              id="query"
              placeholder="eg. XF23mmF1.4 R"
              value={this.state.currSearchValue}
              onChange={this.handleChange}//use this for auto complete
              required  />
            <input type="submit" value="Search" />
          </form>
        </div>

        <PhotoCarousel searchString={this.state.searchString} />
      </div>
    );
  }
}

export default SearchBar;
