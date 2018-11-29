import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,

    document.getElementById('root')
  );

  serviceWorker.register();