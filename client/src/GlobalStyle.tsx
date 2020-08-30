import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100%;
    font-family: 'Source Serif Pro', serif;
    margin: 0;
    padding: 0;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    font-family: 'Arvo', Arial, Helvetica, Sans-serif;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
   }

  h2 {
    font-size: 2em;
    line-height: 1.5em;
  }
  
  p, li, ul, ol {
    font-family: 'Raleway';
    color: white;
    font-size: 20px;
    line-height: 1.25em;
  }
  

`;

export default GlobalStyle;
