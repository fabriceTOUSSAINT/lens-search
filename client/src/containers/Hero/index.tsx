import React from 'react';
import styled from 'styled-components/macro';

// Store
import { useStoreSelectedLensQuery } from '../../generated/globalTypes';
import defaultBackground from '../../assets/lens_jawn_bg.jpg';

const Hero = () => {
  const { data } = useStoreSelectedLensQuery();

  const { getSelectedLens } = { ...data };
  const {
    lensName,
    fStopMin,
    fStopMax,
    focalLength,
    lensMount,
    msrp,
    msrp_002,
  } = { ...getSelectedLens };

  return (
    <HeroWrapper>
      <BackgroundLeft bg={defaultBackground} />
      <BackgroundRight />
      <LensInfo>
        {getSelectedLens ? (
          <>
            <LensInfoDetail>{lensName}</LensInfoDetail>
            <LensInfoDetail>{`F/ stop ${fStopMin} - ${fStopMax}`}</LensInfoDetail>
            <LensInfoDetail>{`${lensMount} Mount`}</LensInfoDetail>
            <LensInfoDetail>{`${focalLength}mm`}</LensInfoDetail>
            <LensInfoDetail>{`MSRP: $${msrp}`}</LensInfoDetail>
          </>
        ) : (
          <LensInfoDetail>Search for a lens!</LensInfoDetail>
        )}
      </LensInfo>
    </HeroWrapper>
  );
};

export default Hero;

const LensInfoDetail = styled.h1`
  color: #000;
  font-size: 1.7rem;
  line-height: 1.6rem;
  font-weight: 800;
`;
const BackgroundLeft = styled.div<{ bg: any }>`
  width: 65vw;
  height: 400px;
  background: url(${({ bg }: any) => bg});
  background-size: cover;
  background-position: bottom;
`;
const BackgroundRight = styled.div`
  width: 35vw;
  display: block;
`;

const HeroWrapper = styled.div`
  background: #60becc;
`;

const LensInfo = styled.div`
  top: 60px;
  right: 300px;
  background: #fff;
  min-width: 400px;
  padding: 40px 60px;
  border-radius: 4px;
  position: absolute;
`;
