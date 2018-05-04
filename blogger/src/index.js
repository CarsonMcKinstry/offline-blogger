import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BlogProvider from './BlogContext';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

ReactDOM.render(
  <MuiThemeProvider>
    <BlogProvider>
      <App />
    </BlogProvider>
  </MuiThemeProvider>
  , document.getElementById('root'));
registerServiceWorker();
