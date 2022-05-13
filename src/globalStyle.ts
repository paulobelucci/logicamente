import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Share Tech Mono', monospace;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
    background-color: #f7f7f7;
  }

  button {
    cursor: pointer;
  }

`