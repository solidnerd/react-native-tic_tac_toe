/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import TopBar from './common/components/topbar';
import Board from './common/components/board';

class TicTacToe extends Component {
  render() {
    return (
      <View>
        <TopBar/>
        <Board/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  }
});

AppRegistry.registerComponent('TicTacToe', () => TicTacToe);
