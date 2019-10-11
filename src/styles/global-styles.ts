import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  body {
    margin: 0px;
    padding: 0;

    line-height: 1;
    color: rgb(21,22,61);

    background-color: rgb(236,236,236);

    font-family: 'Roboto', sans-serif;
    font-display: swap;

    font-size: 12px;
  }
`;
