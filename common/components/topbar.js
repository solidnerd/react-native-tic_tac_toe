import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class TopBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Reactive Tic Tac Toe</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#ff7f00',
    alignItems: 'center'
  },
  text: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: 'bold'
  }
});
