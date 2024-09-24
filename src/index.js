import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, legacy_createStore as createStore } from 'redux';
import { logger } from './middlewares';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/rootReducers';
import { HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

const composeAlt = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composedEnhancers = composeAlt(applyMiddleware(thunk, logger))

const store = createStore(rootReducer, composedEnhancers) 

const favicon = require('../public/gengarIcono2.png');
const link = document.createElement('link');
link.rel = 'icon';
link.href = favicon;
link.type = 'image/png';
document.head.appendChild(link);

root.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>
);