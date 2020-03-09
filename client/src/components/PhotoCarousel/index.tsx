import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SELECTED_LENS } from '../../apollo/localSchema';

const PhotoCarousel: React.FC = (props: any) => {
    const { data } = useQuery(GET_SELECTED_LENS);
    // console.log(data, '<<<<<<')
    return (
        <div>
            <h3>Photos</h3>
        </div>
        
    )
}

export default PhotoCarousel;