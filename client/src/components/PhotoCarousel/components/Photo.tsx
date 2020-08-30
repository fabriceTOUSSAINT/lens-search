import React from 'react';
import styled from 'styled-components/macro';

import {
  CameraIcon,
  FocalLengthIcon,
  FstopIcon,
  LensIcon,
  PhotographerIcon,
  Author,
} from '../../../assets/icons';

interface PhotoProps {
  photo: any;
}

const Photo = ({ photo }: PhotoProps) => {
  const findTagInfo = (tagName: string) => {
    const exifInfo = photo?.exif?.filter((exif: any) => {
      return exif.tag === tagName;
    });

    const [detail] = exifInfo;
    return detail?.raw?._content ?? '';
  };

  const lensShotWith = 'jawn';

  const cameraShotWith = `${findTagInfo('Make')} ${findTagInfo('Model')}`;
  const fStopShotWith = findTagInfo('FNumber');
  const exposure = findTagInfo('ExposureTime');
  const iso = findTagInfo('ISO');
  const focal = findTagInfo('FocalLength');

  return (
    <PhotoWrapper>
      <PhotoImg key={photo.thumbnail} src={photo.imageUrl} />
      <PhotoDetails>
        <PhotoDetailsText>
          <CameraIcon />
          {cameraShotWith}
        </PhotoDetailsText>
        <PhotoDetailsText>
          <FstopIcon />
          {fStopShotWith}
        </PhotoDetailsText>
        <PhotoDetailsText>{`Exposure: ${exposure}`}</PhotoDetailsText>
        <PhotoDetailsText>{`ISO: ${iso}`}</PhotoDetailsText>
        <PhotoDetailsText>
          <FocalLengthIcon />
          {focal}
        </PhotoDetailsText>
      </PhotoDetails>
    </PhotoWrapper>
  );
};

export default Photo;

const PhotoWrapper = styled.div`
  width: 300px;
  height: fit-content;
  border-radius: 4px;
  margin: 10px;
  background: #fff;
`;
const PhotoImg = styled.img`
  width: 300px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;
const PhotoDetails = styled.div`
  max-width: 300px;
  padding: 20px;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0px 0px 15px #00000047;
`;

const PhotoDetailsText = styled.div`
  display: flex;
  align-items: center;
  padding: 2px 0px;
  font-weight: 600;

  svg {
    margin-right: 15px;
  }
`;
