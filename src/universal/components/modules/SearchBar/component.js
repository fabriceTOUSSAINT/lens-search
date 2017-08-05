// @flow
import React from 'react';

type State = {
    searchValue: ?string
}

type Props = {
    updateSearchTerm: () => any,
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
    }

    render() {
        return (
            <div className="main-page">
                <div className="search-block">
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
            </div>
        );
    }
}

export default SearchBar;
