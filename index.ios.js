import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Application from './Application';

export default class LittlePatrick extends Component {
  render() {
    return (<Application />);
  }
}

AppRegistry.registerComponent('LittlePatrick', () => LittlePatrick);
