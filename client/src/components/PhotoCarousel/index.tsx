import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

// Schema data
import {
  useStoreSelectedLensQuery,
  usePhotosShotWithLazyQuery,
} from '../../generated/globalTypes';

// Shared components
import SectionTitle from '../SectionTitle';
import Photo from './components/Photo';

const PhotoCarousel: React.FC = (props: any) => {
  const { data: selectedLensCache } = useStoreSelectedLensQuery();

  console.log({ selectedLensCache });
  const [lazyFetchPhotos, { data }] = usePhotosShotWithLazyQuery();

  useEffect(() => {
    if (Boolean(selectedLensCache?.getSelectedLens?.lensName)) {
      lazyFetchPhotos({
        variables: {
          lensName: selectedLensCache?.getSelectedLens?.lensName,
        },
      });
    }
  }, [selectedLensCache?.getSelectedLens?.lensName]);

  return (
    <div>
      <SectionTitle
        topText={'Photos shot with'}
        bottomText={selectedLensCache?.getSelectedLens?.lensName ?? ''}
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
