// @flow
import React from 'react';
import SearchFlickr from '../../utils/flickr';
// import Search500px from '../..utils/500px';
let Typeahead = require('react-typeahead').Typeahead;
let Tokenizer = require('react-typeahead').Tokenizer;
type State = {
    searchValue: ?string
}

type Props = {
    updateSearchTerm: () => any,
    populatePhotosData: () => any,
    lens: String
}

class SearchBar extends React.Component {
    state: State = {
        searchValue: 'XF23mmF1.4 R'
    };

    props: Props;

    handleChange = (e: Object) => {
        e.preventDefault();
        this.setState({ searchValue: e.target.value });
    }

    setSearch = (e: Object) => {
        e.preventDefault();
        this.props.updateSearchTerm(this.state.searchValue);
        const searchPhotoMethod = 'flickr.photos.search';
        const searchString = this.state.searchValue;
        SearchFlickr(searchString, searchPhotoMethod, null, this.props.populatePhotosData);
    }

    render() {
        const jawn = {
            type:"search",
            name:"query",
            id:"query",
            placeholder:"eg. XF23mmF1.4 R",
            value:this.state.searchValue,
            onChange:this.handleChange,//use this for auto complete
        }

        return (
            <div className="main-page">
                <div className="search-block">
                    <Typeahead
                        options={['John', 'Paul', 'George', 'Ringo']}
                        maxVisible={2}
                        customClasses='input'
                        placeholder='eg. XF23mmF1.4 R'
                        inputProps={jawn}
                    />
                    <form className="search-form" id="search-form" onSubmit={this.setSearch} >
                        <input
                            type="search"
                            name="query"
                            id="query"
                            placeholder="eg. XF23mmF1.4 R"
                            value={this.state.searchValue}
                            onChange={this.handleChange}//use this for auto complete
                            required />
                        <input type="submit" value="Search" />
                    </form>
                </div>
                <h1>Searched Lens: {this.props.lens}</h1>
                <Tokenizer
                    options={['John', 'Paul', 'George', 'Ringo']}
                    onTokenAdd={function (token) {
                        console.log('token added: ', token);
                    }}
                />
            </div>
        );
    }
}

export default SearchBar;
