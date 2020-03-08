import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html {
    height: 100%;
    background: linear-gradient(90deg, #80A2CC, #F99F86);
    background: -webkit-linear-gradient(90deg, #80A2CC, #F99F86);
  }

  body {
    min-height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    font-family: 'Arvo', Arial, Helvetica, Sans-serif;
    background: linear-gradient(90deg, #80A2CC, #F99F86);
    background: -webkit-linear-gradient(90deg, #80A2CC, #F99F86);
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
   }

   h1,h2,h3,h4,h5,h6 {
    color: white;
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
  
  .root {
    width: 100%;
    height: 100%;
  }

`

export default GlobalStyle;