import React from 'react';
import Results from './Results/Results';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      searchQuery: 'canon 50mm',
    };

    this.handleChangeMessage = this.handleChangeMessage.bind(this);
  }

  componentDidMount() {
    document.getElementById('search-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.setState({ searchQuery: this.state.message });
    });
  }

  handleChangeMessage(e) {
    this.setState({ message: e.target.value });
  }


  render() {
    return (
      <div>
        <div className="search-block">
          <h1>Search for your next lens!</h1>
          <form className="search-form" id="search-form" action="/search" method="get" role="search">
            <input
              type="search"
              name="query"
              id="query"
              value={this.state.message} onChange={this.handleChangeMessage}
              placeholder="ex: Fuji xf 23mm f/1.2"
              required
            />
            <input type="submit" value="Search" />
          </form>
        </div>

        {/**
           * pass along search query to results component
           * Logic for where to divide search logic through here
           *
           */}
        <Results lens={this.state.searchQuery} />
        <h2>{this.state.message}</h2>
        <h2>{this.state.searchQuery}</h2>


      </div>
    );
  }
}

export default Search;
