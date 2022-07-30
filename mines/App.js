import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import { createMineBoard, cloneBoard, openField, gameStatus, showMines, invertFlag } from './src/mines-service';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = this.createState();
  }

  createState = () => {
    const rows = params.getRowsAmount();
    const columns = params.getColumnsAmount();
    return {
      board: createMineBoard(rows, columns, this.minesAmount(rows, columns)),
      won: false,
      lost: false
    }
  }

  minesAmount = (rows, columns) => {
    return Math.ceil(columns * rows * params.difficultLevel);
  }

  onFlagField = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const { won } = gameStatus(board);
    if (won) {
      Alert.alert('Aeoww', 'Joga muito, GGwp')
    }

    this.setState({ board, won });
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const { lost, won } = gameStatus(board);

    if (lost) {
      showMines(board);
      Alert.alert("ERRROu!!", "Ta pegando fogo bicho");
    }
    if (won) {
      Alert.alert('Aeoww', 'Joga muito, GGwp')
    }

    this.setState({ board, lost, won });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text >Iniciando o Mines!</Text>
        <Text >Tamanho da grade:
          {params.getRowsAmount()}x{params.getColumnsAmount()}</Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} onFlagField={this.onFlagField} />
        </View>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});
