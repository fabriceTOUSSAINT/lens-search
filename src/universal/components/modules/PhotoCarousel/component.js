// @flow
import React from 'react';

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
        // console.log({imageData})
    return (
        <div className='photo-carousel'>
            <div className='grid-container'>
                <h1>Photo Carousel</h1>
            </div>
        </div>
    );
}

export default PhotoCarousel;