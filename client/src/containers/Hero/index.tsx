import React from 'react';
import styled from 'styled-components/macro';

import defaultBackground from '../../assets/lens_jawn_bg.jpg';

const Hero = () => {
  return (
    <HeroWrapper>
      <BackgroundLeft bg={defaultBackground} />
      <BackgroundRight />
      <LensInfo> Lens Jawn</LensInfo>
    </HeroWrapper>
  );
};

export default Hero;

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

const LensInfo = styled.h1`
  top: 60px;
  right: 300px;
  background: #fff;
  color: #000;
  min-width: 600px;
  padding: 12px 18px;
  font-size: 2rem;
  border-radius: 4px;
  position: absolute;
`;
