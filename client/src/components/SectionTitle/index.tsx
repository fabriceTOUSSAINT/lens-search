import React from 'react';
import styled from 'styled-components/macro';

interface SectionTitleProps {
  topText: string;
  bottomText: string;
}

const SectionTitle = ({ topText, bottomText }: SectionTitleProps) => (
  <Wrapper>
    <Row>
      <TopText>{topText}</TopText>
      <Dash />
    </Row>
    <Row>
      <Dash />
      <BottomText>{bottomText}</BottomText>
    </Row>
  </Wrapper>
);

export default SectionTitle;

const Wrapper = styled.div`
  margin-bottom: 40px;
  padding-left: 20px;
  font-family: 'Source Serif Pro', serif;
  font-weight: 800;
  @media (max-width: 768px) {
    padding: 0px;
  }
`;

const Dash = styled.span`
  background: #ed6a1e;
  height: 4px;
  border-radius: 10px;
  width: 100px;
  display: inline-flex;

  @media (max-width: 768px) {
    width: 50px;
  }
`;
const Row = styled.div`
  font-weight: 900;
  font-size: 34px;
  display: flex;
  align-items: center;
  color: #131d60;
  text-transform: uppercase;
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;
const TopText = styled.div`
  padding: 0 17px;
`;
const BottomText = styled.div`
  padding: 0 17px;
`;
