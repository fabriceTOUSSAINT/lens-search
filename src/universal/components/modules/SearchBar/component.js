// @flow
import React from 'react';
import SearchFlickr from '../../utils/flickr';
import axios from 'axios';

const lensDB = require('../../../config/lens_db.json');
let Typeahead = require('react-typeahead').Typeahead;

type State = {
    lensNameArr?: any;
}

type Props = {
    updateSearchTerm: () => any,
    populatePhotosData: () => any,
    activeLensDetail: () => any,
    searchTerm?: string
}

class SearchBar extends React.Component {
    state: State = {
        lensNameArr: []
    };

    componentDidMount() {
        // TODO: build this array on server, push to the store to have access there
        this.buildLensArray();
    }

    props: Props;

    /**
     * buildLensArray
     * 
     * Pulls lens.json (lensDB) and creates new array of just the lens names, stores result in state
     */
    buildLensArray = () => {
        const lensNameArr = [];
        const otherShitArr = [];

        lensDB.forEach(lens => {
            if (lens.lens_name) {
                lensNameArr.push(lens.lens_name);
            } else if(lens.lens_name) {

            }
        });



        this.setState({lensNameArr});

    }

    /**
     * setSearch
     * 
     * set state with users search, prep for api calls
     */
    setSearch = async (searchValue: String) => {

        // updates state with new search term
        this.props.updateSearchTerm(searchValue);

        // TODO: take index of searchValue of array. use that indexx to pull full info from
        // redux state lensDetail[searchValueIndexx]

        // Calls to search Flickr database and add relevent data to the store
        if(searchValue !== '') {
            const lensIndex = this.state.lensNameArr.indexOf(searchValue);
            const lensDetail = this.props.localLensData[lensIndex];
            this.props.activeLensDetail(lensDetail);

            this.props.populatePhotosData(await SearchFlickr(lensDetail, searchValue));
        }
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
