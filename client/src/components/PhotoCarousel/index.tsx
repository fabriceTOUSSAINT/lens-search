import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useQuery, useLazyQuery } from '@apollo/client';
import { GET_SELECTED_LENS } from '../../apollo/localSchema';
import { PHOTOS_SHOT_WITH } from '../../apollo/serverSchema';

// Shared components
import SectionTitle from '../SectionTitle';
import Photo from './components/Photo';

const PhotoCarousel: React.FC = (props: any) => {
  const { data: selectedLensCache } = useQuery(GET_SELECTED_LENS);
  const [lazyFetchPhotos, { data }] = useLazyQuery(PHOTOS_SHOT_WITH);

  useEffect(() => {
    if (Boolean(selectedLensCache?.getSelectedLens?.lensName)) {
      lazyFetchPhotos({
        variables: {
          lensName: selectedLensCache?.getSelectedLens?.lensName,
        },
      });
    }
  }, [selectedLensCache?.getSelectedLens?.lensName]);

  console.log({ data });
  return (
    <div>
      <SectionTitle
        topText={'Photos shot with'}
        bottomText={selectedLensCache?.getSelectedLens?.lensName}
      />
      <PhotoGridWrapper>
        {data?.photosShotWith?.map((photo: any) => (
          <Photo key={photo.thumbnail} photo={photo} />
        ))}
      </PhotoGridWrapper>
    </div>
  );
};

export default PhotoCarousel;

const PhotoGridWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
