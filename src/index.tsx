import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css'
import { App } from './App';
import { ThemeProvider } from './contexts/themeContext';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);