import SearchBar from './component';
import { connect } from 'react-redux';
import { updateSearchTerm, populatePhotosData, activeLensDetail } from '../../../redux/actions';
import { bindActionCreators } from 'redux';

import './style.scss';

// add lens search term to state
// Create actions to update Redux store based on results
// onSubmit, fetch data from flickr, 500px, amazon, dpReview
// update store from new data

const mapStateToProps = state => {
  return {
  	activeLens: state.activeLens,
    searchTerm: state.searchTerm,
    localLensData: state.localLensData
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateSearchTerm,
  populatePhotosData,
  activeLensDetail
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);