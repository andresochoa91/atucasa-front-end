import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './Context';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);