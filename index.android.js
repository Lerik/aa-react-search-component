/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { Provider } from 'react-redux';
import io from 'socket.io-client/dist/socket.io';
import { store } from './src/store';
import Routes from './src/containers/Routes';
require('./src/feathers/socketio')(io);
console.disableYellowBox = true; // eslint-disable-line

export default class GiftHub extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GiftHub', () => GiftHub);
