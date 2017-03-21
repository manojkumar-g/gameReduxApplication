import React from 'react';
import {render} from 'react-dom';
import css from './styles/home.styl'
import App from './containers/App.jsx'
import store from './configureStore';
import {Provider} from 'react-redux';

render(
  <Provider store = {store}>
    <App/>
  </Provider>
  ,document.getElementById('root'));
