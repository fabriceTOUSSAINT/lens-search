// @flow
import React from 'react';
// import SearchFlickr from '../../utils/flickr';
// import Search500px from '../..utils/500px';
import axios from 'axios';

const lensDB = require('./lens.json');
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
        // searchValue: 'XF23mmF1.4 R',
        searchValue: '',
        lensNameArr: []
    };

    componentDidMount() {
        // TODO: build this array on server, push to the store to have access there
        this.buildAutocorrectLensArray();
    }

    props: Props;

    buildAutocorrectLensArray = () => {
        const lensNameArr = [];
        lensDB.forEach(lens => {
            if (lens.lens_name) {
                lensNameArr.push(lens.lens_name);
            }
        });

        this.setState({lensNameArr});

    }

    handleChange = (e: Object) => {
        e.preventDefault();
        this.setState({ searchValue: e.target.value });
    }

    setSearch = (e: Object) => {
        // e.preventDefault();
        console.warn('selected');
        console.log('=============');
        this.props.updateSearchTerm(this.state.searchValue);
        const searchPhotoMethod = 'flickr.photos.search';
        const searchString = this.state.searchValue;
        // SearchFlickr(searchString, searchPhotoMethod, null, this.props.populatePhotosData);
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
        console.log(this.state.searchValue, '<<<< Search value')
        return (
            <div className="main-page">
                <div className="search-block">
                    <form className="search-form" id="search-form" onSubmit={this.setSearch} >
                        {/*<input
                            type="search"
                            name="query"
                            id="query"
                            placeholder="eg. XF23mmF1.4 R"
                            value={this.state.searchValue}
                            onChange={this.handleChange}//use this for auto complete
                            required />
                        <input type="submit" value="Search" /> */}
                 <Typeahead
                        options={this.state.lensNameArr}
                        maxVisible={5}
                        placeholder='eg. XF23mmF1.4 R'
                        value={this.state.searchValue}
                        inputProps={jawn}
                        onOptionSelected={this.setSearch}
                />

                    </form>
                </div>
            </div>
        );
    }
}

export default SearchBar;
