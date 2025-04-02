import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeProvider} from "styled-components";

const darkTheme = {
    textColor : "whitesmoke",
    backgroundColor : "#111"
}

const whiteTheme = {
    backgroundColor : "whitesmoke",
    textColor : "#111"
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
  </React.StrictMode>
);