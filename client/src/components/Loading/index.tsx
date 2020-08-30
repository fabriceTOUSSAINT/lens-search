import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const Loading = ({ className }: { className?: string }) => {
  return (
    <LogoSvg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2.66667C6.84534 2.66667 2.66667 6.84534 2.66667 12C2.66667 17.1547 6.84534 21.3333 12 21.3333C17.1547 21.3333 21.3333 17.1547 21.3333 12H24C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0V2.66667Z"
        fill="#00B9F2"
      />
    </LogoSvg>
  );
};

export default Loading;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LogoSvg = styled.svg`
  display: inline-block;
  animation: ${rotate} 0.5s linear infinite;
`;
