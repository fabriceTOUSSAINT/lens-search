import { connect } from 'react-redux';
import PhotoCarousel from './component';

//Will pull state down from store and pass props to component such as photo image url
function mapStateToProps(state) {
    return {
        imageData: state.lens_info
    }
}

export default connect(mapStateToProps)(PhotoCarousel);