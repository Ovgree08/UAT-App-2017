
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import Navigator from './navigator';
import createStore from './redux/createStore';

const store = createStore();

const UATAPP = () => (
  <Provider store={store}>
    <Navigator/>
  </Provider>
);

export default UATAPP;