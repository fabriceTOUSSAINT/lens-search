// @flow
import React from 'react';
// import SearchFlickr from '../../utils/flickr';
//import 500px search component
//import other api search components



// class PhotoCarousel extends React.Component {
    // shouldComponentUpdate(nextProps) {
    //     return (nextProps.imageData !== this.props.imageData);
    // }

    // componentWillUpdate(nextProps) {
    //     const searchPhotoMethod = 'flickr.photos.search';
    //     const { searchString } = this.props;
    //     if (nextProps.searchString !== this.props.searchString) {
    //         SearchFlickr(searchString, searchPhotoMethod, null, this.imagesRetrieved);
    //     }
    // }

    // props: Props;

    // imagesRetrieved = (data) => {
    //     this.setState({
    //         imageData: data
    //     });
    // }

// PhotoCarousel only needs to know about photo image urls.
type Props = {
    imageData: any
};

const PhotoCarousel = ({imageData}: Props) => {
    // const imageGrid = imageData.map(data => (
    //     <div className='image'>
    //         <h1>{data.lens_name}</h1>
    //     </div>
    //     )
    // )

    return (
        <div className='photo-carousel'>
            <div className='grid-container'>
            </div>
        </div>
    );
}

export default PhotoCarousel;