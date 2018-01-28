// @flow
import React from 'react';
// import SearchFlickr from '../../utils/flickr'
// import Search500px from '../..utils/500px';
import axios from 'axios';

const lensDB = require('./lens.json');
let Typeahead = require('react-typeahead').Typeahead;

type State = {
    lensNameArr?: any;
}

type Props = {
    updateSearchTerm: () => any,
    populatePhotosData: () => any,
    searchTerm?: string
}

class SearchBar extends React.Component {
    state: State = {
        lensNameArr: []
    };

    componentDidMount() {
        // TODO: build this array on server, push to the store to have access there
        this.buildAutocorrectLensArray();
    }

    props: Props;

    /**
     * buildAutocorrectLensArray
     * 
     * Pulls lens.json (lensDB) and creates new array of just the lens names, stores result in state
     */
    buildAutocorrectLensArray = () => {
        const lensNameArr = [];
        lensDB.forEach(lens => {
            if (lens.lens_name) {
                lensNameArr.push(lens.lens_name);
            }
        });

        this.setState({lensNameArr});

    }

    /**
     * setSearch
     * 
     * set state with users search, prep for api calls
     */
    setSearch = (searchValue: String) => {
        // this.setState({ searchValue: searchValue});

        // updates state with new search term
        this.props.updateSearchTerm(searchValue);
        
        // const searchPhotoMethod = 'flickr.photos.search';
        // const searchString = this.state.searchValue;
        // SearchFlickr(searchString, searchPhotoMethod, null, this.props.populatePhotosData);
    }

    render() {
        const defaultTypeaheadProps = {
            type:"search",
            name:"query",
            id:"query",
            placeholder:"eg. XF23mmF1.4 R",
        }

        return (
            <div className="main-page">
                <div className="search-block">
                    <form className="search-form" id="search-form" onSubmit={this.setSearch} >
                        <Typeahead
                            options={this.state.lensNameArr}
                            maxVisible={5}
                            placeholder='eg. XF23mmF1.4 R'
                            inputProps={defaultTypeaheadProps}
                            onOptionSelected={this.setSearch}
                        />
                        
                        <h1>{this.props.searchTerm}</h1>

                    </form>
                </div>
            </div>
        );
    }
}

export default SearchBar;
