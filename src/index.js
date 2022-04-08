import React from 'react';
import ReactDOM from 'react-dom/client';

// Styling import
import './global.css';
import CssBaseline from '@mui/material/CssBaseline';

// Import fetching libraries
import axios from 'axios';

// Redux import
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// Redux thunk import
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import App from './App';
import reportWebVitals from './reportWebVitals';

window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container);

root.render(
  <React.Fragment>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.Fragment>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
