import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';

import Cell from './cell';

class Board extends Component {
  constructor(props){
    super(props);
    this._onPressButton = this._onPressButton.bind(this)
    this.board = [];
    for (let i = 0; i < this.props.height; i++) {
      let row = [];
      for (let j = 0; j < this.props.width; j++) {
        row.push({player:'NOONE'});
      }
      this.board.push(row);
    }
  }

  nextPlayer() {
    return this.state.player === 'X' ? 'O' : 'X';
  }

  componentWillMount(){
    this.setState({player: 'X', gameBoard: this.board});
  }

  _onPressButton(row, col){
    if(this.board[row][col].player == 'NOONE'){
      this.board[row][col].player = this.state.player;
      this.setState({player: this.nextPlayer(), gameBoard: this.board});
    }
    this.setState({
      gameBoard: this.checkForWinner(this.board)
    })
  }

  checkForWinner(gameboard){
    gameboard = this.checkForWinnerInDepth(gameboard, {row:0, col: 0},{row:0, col: 1},{row:0, col: 2})
    gameboard = this.checkForWinnerInDepth(gameboard, {row:1, col: 0},{row:1, col: 1},{row:1, col: 2})
    gameboard = this.checkForWinnerInDepth(gameboard, {row:2, col: 0},{row:2, col: 1},{row:2, col: 2})
    gameboard = this.checkForWinnerInDepth(gameboard, {row:0, col: 0},{row:1, col: 1},{row:2, col: 2})
    gameboard = this.checkForWinnerInDepth(gameboard, {row:2, col: 2},{row:1, col: 1},{row:0, col: 0})
    gameboard = this.checkForWinnerInDepth(gameboard, {row:2, col: 0},{row:1, col: 1},{row:0, col: 2})
    gameboard = this.checkForWinnerInDepth(gameboard, {row:0, col: 2},{row:1, col: 1},{row:2, col: 0})
    return gameboard;
  }

  checkForWinnerInDepth(gameboard, field1, field2, field3){
    if(gameboard[field1.row][field1.col].player !== 'NOONE' || gameboard[field2.row][field2.col].player !== 'NOONE'|| gameboard[field3.row][field3.col].player !== 'NOONE'){
      if(gameboard[field1.row][field1.col].player === gameboard[field2.row][field2.col].player && gameboard[field2.row][field2.col].player === gameboard[field3.row][field3.col].player){
        gameboard[field2.row][field2.col].winningField = true;
        gameboard[field3.row][field3.col].winningField = true;
        gameboard[field1.row][field1.col].winningField = true;
      }
    }
    return gameboard;
  }

  render() {
    const grid = this.board.map((row, rowId) => {
      const cells = row.map((cell, cellId) => {
        return <Cell key={cellId} row={rowId} col={cellId} onPress={this._onPressButton} player={this.state.gameBoard[rowId][cellId].player} winningField={this.state.gameBoard[rowId][cellId].winningField}/>;
      });
      return <View style={styles.row} key={rowId}>{cells}</View>;
    });

    return (
      <View style={styles.container}>
        {grid}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  }
});

Board.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number
};

Board.defaultProps = {
  width: 3,
  height: 3
};

export default Board;
