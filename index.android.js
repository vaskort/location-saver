import React, { Component } from 'react';

import {
  AppRegistry,
} from 'react-native';

import update from 'immutability-helper';
import App from './src/App';

export default class LocationSaver extends Component {

  render() {
    return (
      <App />
    );
  }

}

AppRegistry.registerComponent('LocationSaver', () => LocationSaver);
