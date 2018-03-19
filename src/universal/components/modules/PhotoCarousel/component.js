// @flow
import React from 'react';

// Style
import './index.scss';

// PhotoCarousel only needs to know about photo image urls.
type Props = {
    imageData: any
};

const PhotoCarousel = ({imageData}: Props) => {

    const renderImageGrid = (photo) => {
        if(!!photo) {
            return (
                <div key={photo.id} className='image'>
                    <img src={photo.imageUrl} />
                </div>  
            )
        }
    }

    const renderImages = !!imageData;

    return (
        <div className='photo-carousel'>
            <h1>Photo Carousel</h1>
            <div className='grid-container'>
                { renderImages && ( imageData.map((photo) => renderImageGrid(photo)) )}
            </div>
        </div>
    );
}

export default PhotoCarousel;