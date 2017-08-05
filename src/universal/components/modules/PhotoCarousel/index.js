import React from 'react';
import SearchFlickr from '../../utils/flickr';
//import 500px search component
//import other api search components


type Props = {
    searchString: String
}

class PhotoCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imageData: []
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.searchString !== this.props.searchString) || (nextState.imageData !== this.state.imageData);
    }

    componentWillUpdate(nextProps) {
        const searchPhotoMethod = 'flickr.photos.search';
        const {searchString} = this.props;
        if (nextProps.searchString !== this.props.searchString) {
            SearchFlickr(searchString, searchPhotoMethod, null, this.imagesRetrieved);
        }
    }

    props: Props;

    imagesRetrieved = (data) => {
        this.setState({
            imageData: data
        });
    }


    render() {
        const imageGrid = this.state.imageData.map((data, index) =>
            <div key={index} className='image'>
                <img src={data.imageUrl} />
                <h3>{data.camera}</h3>
            </div>
        );

        return (
            <div className='photo-carousel'>
                <h1>{this.props.searchString}</h1>
                <div className='grid-container'>
                    {imageGrid}
                </div>
            </div>
        );
    }
}

export default PhotoCarousel;