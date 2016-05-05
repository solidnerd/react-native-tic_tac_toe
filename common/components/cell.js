import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Cell extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    let state = this.checkPlayer(this.props.player)
    if(this.props.winningField) state.winning = true
    this.setState(state);
  }

  checkPlayer(player){
    let state = { iconName : 'NOONE'};
    if(player){
      switch(player){
        case 'X':
          state.iconName = this.playerIcon ? this.props.playerIcon : 'times'
          state.playerColor = this.props.playerColor ? this.props.playerColor : '#ff0000'
        break
        case 'O':
          state.iconName = this.playerIcon ? this.props.playerIcon : 'circle-o'
          state.playerColor = this.props.playerColor ? this.props.playerColor : '#0080ff'
        break;
      }
    }
    return state;
  }

  render() {
    let icon = this.state.iconName !== 'NOONE' ? <Icon name={this.state.iconName} size={size-offset} color={this.state.playerColor} /> : null;
    return (
      <TouchableOpacity style={this.props.winningField ? styles.containerWinning : styles.container} onPress={
          ()=> {
            this.props.onPress(this.props.row, this.props.col);
            this.setState(this.checkPlayer(this.props.player))
           }
      } activeOpacity={0.5}>
      {icon}
      </TouchableOpacity>
    );
  }
}

const size=100;
const offset=10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: size,
    height: size,
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d6d7da'
  },
  containerWinning: {
    flex: 1,
    width: size,
    height: size,
    alignItems: 'center',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#d6d7da',
    backgroundColor: '#00ff00'
  }
});
