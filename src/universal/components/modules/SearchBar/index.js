import SearchBar from './component';
import { connect } from 'react-redux';
import { updateSearchTerm } from '../../../redux/actions';
import { bindActionCreators } from 'redux';

// add lens search term to state
// Create actions to update Redux store based on results
// onSubmit, fetch data from flickr, 500px, amazon, dpReview
// update store from new data

const mapStateToProps = state => ({
  lens: state.searchTerm
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateSearchTerm
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);